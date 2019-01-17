import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

const middleware = applyMiddleware(promise(), thunk, createLogger());
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(middleware));

export default store;
