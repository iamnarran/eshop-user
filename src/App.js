import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  BrowserHistory,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { addLocaleData, injectIntl } from 'react-intl';
import { updateIntl, IntlProvider } from 'react-intl-redux';
import en from 'react-intl/locale-data/en';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

import store from './store';
import { storage } from './utils';
import Layouts from 'layouts/Default';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'scss/app.scss';

import Header from './containers/AppHeader';
import Footer from './containers/AppFooter';

import Homepage from './containers/Homepage';
import messages from './messages.json';
import Salepage from './containers/SaleProduct';
import Newpage from './containers/Newpage';
import Recipe from './pages/Recipe';
import Package from './pages/Package';
import Promotion from './pages/Promotion';
import Season from './pages/Season';

// library.add(fab, faCheckSquare, faCoffee);
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
          !isAuth ? <Component {...props} /> : <Redirect to={''} />
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

  render() {
    const { auth } = this.props;

    const routes = [
      {
        path: "/",
        exact: true,
        component: (rest) => <Homepage {...rest} {...this.props}/>
      },
      {
        exact: false,
        path: "/salepage",
        component: (rest) => <Salepage {...rest} {...this.props}/>
      },
      {
        exact: false,
        path: "/new",
        component: (rest) => <Newpage {...rest} {...this.props}/>
      },
      {
        exact: false,
        path: "/recipe",
        component: (rest) => <Recipe {...rest} {...this.props}/>
      },
      {
        exact: false,
        path: "/package",
        component: (rest) => <Package {...rest} {...this.props}/>
      },
      {
        exact: false,
        path: "/promotion",
        component: (rest) => <Promotion {...rest} {...this.props}/>
      },
      {
        exact: false,
        path: "/season",
        component: (rest) => <Season {...rest} {...this.props}/>
      },
    ];

    return (
      auth && (
        <Router history={BrowserHistory}>
          <div>
            <Header />

            <Switch>
              {
                routes.map((route, index) => {
                  return (
                    <Public 
                      {...this.props}
                      key={index}
                      exact={route.exact}                     
                      path={route.path} 
                      component={route.component}
                    />
                  );
                })
              }            
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
        locale: 'en',
        messages: messages['en']
      })
    );

    if (storage.has('user')) {
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

export default App;

{/* <Route
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
            /> */}