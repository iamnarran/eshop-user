import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';
import auth from './auth';

export default combineReducers({
    auth: auth,
    intl: intlReducer
});
