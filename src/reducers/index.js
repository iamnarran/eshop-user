import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";

import auth from "./auth";
import cart from "./cart";

export default combineReducers({
  auth,
  intl: intlReducer,
  cart
});
