import React, { Component } from "react";
import {
  BrowserRouter as Router,
  BrowserHistory,
  Switch,
  Route
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { addLocaleData, injectIntl } from "react-intl";
import { IntlProvider } from "react-intl-redux";
import en from "react-intl/locale-data/en";
import ScrollToTop from "react-router-scroll-top";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import store from "./store";

import "scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
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
  StaticPage,
  CategoryInfo,
  Cart,
  Checkout
} from "./containers";

import Private from "./components/Private";

//library.add(fab, faCheckSquare, faCoffee);
library.add(fas, far, fab);

addLocaleData([...en]);

@connect(stores => ({ ...stores }))
@injectIntl
class Localization extends Component {
  componentWillMount() {
    const { formatMessage } = this.props.intl;
    window.formatMessage = formatMessage;
  }

  state = { isToggle: false };
  toggleMenu = () => {
    this.setState({ isToggle: !this.state.isToggle });
  };
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
        exact: true,
        path: "/discount",
        component: rest => <Discount {...rest} {...this.props} />
      },
      {
        exact: true,
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
      {
        exact: true,
        path: "/package/:id",
        component: rest => <PackageDetail {...rest} {...this.props} />
      },
      {
        exact: true,
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
      {
        exact: true,
        path: "/delivery",
        component: () => <DeliveryAddress />
      },
      {
        exact: true,
        path: "/userprofile",
        isPrivate: true,
        component: rest => <UserProfile {...rest} {...this.props} />
      },
      {
        exact: true,
        path: "/info/:id",
        component: rest => <StaticPage {...rest} {...this.props} />
      },
      {
        exact: true,
        path: "/CategoryInfo/:id",
        component: rest => <CategoryInfo {...rest} {...this.props} />
      },
      {
        exact: true,
        path: "/cart",
        component: rest => <Cart {...rest} {...this.props} />
      },
      {
        exact: true,
        path: "/checkout",
        component: rest => <Checkout {...rest} {...this.props} />
      }
    ];

    return (
      auth && (
        <Router history={BrowserHistory}>
          <ScrollToTop>
            <div>
              <Header
                isToggle={this.state.isToggle}
                onChange={this.toggleMenu}
              />

              <MobileMenu
                popupClass={popupClass}
                isToggle={this.state.isToggle}
                onChange={this.toggleMenu}
              />

              <Switch>
                {routes.map((route, index) => {
                  return route.isPrivate ? (
                    <Private
                      {...this.props}
                      key={index}
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                    />
                  ) : (
                    <Route
                      {...this.props}
                      key={index}
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                    />
                  );
                })}
              </Switch>

              <Footer />
              <ToastContainer />
            </div>
          </ScrollToTop>
        </Router>
      )
    );
  }
}

class App extends Component {
  render() {
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IntlProvider>
            <Localization />
          </IntlProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
