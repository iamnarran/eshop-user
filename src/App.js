import React, { Component } from "react";
import {
  BrowserRouter as Router,
  BrowserHistory,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider, connect } from "react-redux";
/* import { ToastContainer } from 'react-toastify'; */
import { addLocaleData, injectIntl } from "react-intl";
import { updateIntl, IntlProvider } from "react-intl-redux";
import en from "react-intl/locale-data/en";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

import store from "./store";
import { storage } from "./utils";
/* import Layouts from 'layouts/Default'; */
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "scss/app.scss";
import messages from "./messages.json";
// import Promotion from "./pages/Promotion/index";
// import Season from "./pages/Season/index";
import {
  Footer,
  Header,
  Discount,
  Homepage,
  MobileMenu,
  NewProduct,
  Recipe,
  RecipeDetail,
  Package,
  PackageDetail,
  Season,
  ProductDetail,
  WishList,
  DeliveryAddress,
  UserProfile,
} from "./containers/index";

//library.add(fab, faCheckSquare, faCoffee);
library.add(fas, far, fab);

addLocaleData([...en]);

class Public extends Component {
  render() {
    const { auth, component: Component, ...rest } = this.props;
    const isAuth = auth.user;

    return (
      <Route
        {...rest}
        render={props =>
          !isAuth ? <Component {...props} /> : <Redirect to={""} />
        }
      />
    );
  }
}

@connect(stores => ({ ...stores }))
@injectIntl
class Localization extends Component {
  componentWillMount() {
    const { formatMessage } = this.props.intl;
    window.formatMessage = formatMessage;
  }

  state = { isToggle: false };
  toggleMenu = () => this.setState({ isToggle: !this.state.isToggle });

  render() {
    const popupClass = `fixed-mobile-menu${
      this.state.isToggle ? " activated" : ""
      }`;
    const { auth } = this.props;

    const routes = [
      {
        path: "/",
        exact: true,
        component: rest => <Homepage {...rest} {...this.props} />
      },
      {
        exact: false,
        path: "/discount",
        component: rest => <Discount {...rest} {...this.props} />
      },
      {
        exact: false,
        path: "/new",
        component: rest => <NewProduct {...rest} {...this.props} />
      },
      {
        exact: true,
        path: "/recipe",
        component: rest => <Recipe {...rest} {...this.props} />
      },
      {
        exact: true,
        path: "/recipe/:id",
        component: rest => <RecipeDetail {...rest} {...this.props} />
      },
      {
        exact: true,
        path: "/package",
        component: rest => <Package {...rest} {...this.props} />
      },
      // {
      //   exact: false,
      //   path: "/promotion",
      //   component: rest => <Promotion {...rest} {...this.props} />
      // },
      {
        exact: true,
        path: "/package/:id",
        component: rest => <PackageDetail {...rest} {...this.props} />
      },
      {
        exact: false,
        path: "/season",
        component: rest => <Season {...rest} {...this.props} />
      },
      {
        exact: true,
        path: "/productdetail/:id",
        component: rest => <ProductDetail {...rest} {...this.props} />
      },
      {
        exact: true,
        path: "/WishList/:id",
        component: rest => <WishList {...rest} {...this.props} />
      },
      // {
      //   path: "*",
      //   exact: false,
      //   component: () => <NotFound />
      // },
      {
        path: "/delivery",
        exact: false,
        component: () => <DeliveryAddress />
      },
      {
        path: "/userprofile",
        exact: false,
        component: () => <UserProfile />
      },
    ];

    return (
      auth && (
        <Router history={BrowserHistory}>
          <div>
            <Header isToggle={this.state.isToggle} onChange={this.toggleMenu} />
            <MobileMenu
              popupClass={popupClass}
              isToggle={this.state.isToggle}
              onChange={this.toggleMenu}
            />

            <Switch>
              {routes.map((route, index) => {
                return (
                  <Public
                    {...this.props}
                    key={index}
                    exact
                    path={route.path}
                    component={route.component}
                  />
                );
              })}
            </Switch>

            <Footer />
          </div>
        </Router>
      )
    );
  }
}

class App extends Component {
  componentWillMount() {
    store.dispatch(
      updateIntl({
        locale: "en",
        messages: messages["en"]
      })
    );

    if (storage.has("user")) {
      try {
      } catch (e) { }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <IntlProvider>
          <Localization />
        </IntlProvider>
      </Provider>
    );
  }
}
/* <Route
              path={'/Account'}
              render={props => (
                <Layouts {...props} {...this.props}>
                  <ToastContainer />
                  <Switch>
                    <Private
                      { ...this.props }
                      { ...props }
                      exact
                      path="/"
                      component={rest => (
                        <Account
                          { ...props }
                          { ...rest }
                        />
                      )}
                    /> 
                  </Switch>
                </Layouts>
              )}
            /> */
export default App;
