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
import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

import store from './store';
import { storage } from './utils';
import Layouts from 'layouts/Default';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'scss/app.scss';
// import { setUser } from './actions/users';
// Pages
import Homepage from './containers/Homepage';
import messages from './messages.json';

// library.add(fab, faCheckSquare, faCoffee);
library.add(fab);

addLocaleData([...en]);

// class Private extends Component {
//   render() {
//     const { auth, component: Component, ...rest } = this.props;
//     const isAuth = auth.user;
//     return (
//       <Route
//         { ...rest }
//         render={props =>
//           isAuth ? <Component {...props} /> : <Redirect to="/login" />
//         }
//       />
//     );
//   }
// }

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
    return (
      auth && (
        <Router history={BrowserHistory}>
          <Switch>
            <Public
              {...this.props}
              exact
              path="/"
              component={rest => (
                <Homepage {...rest} {...this.props} />
              )}
            />
            <Route
              path={'/Account'}
              render={props => (
                <Layouts {...props} {...this.props}>
                  <ToastContainer />
                  <Switch>
                    {/* <Private
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
                    /> */}
                  </Switch>
                </Layouts>
              )}
            />
          </Switch>
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
        // const user = storage.get('user');
        // store.dispatch(setUser(user));
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
