import axios from "axios";
// import { connect } from "react-redux";
// import { createStore } from "redux";
import store from "../store";
import config from "../config";
import { storage } from "../utils";
import { signOut, showLoginModal } from "../actions/login";
import reducer from "../reducers";
// const store = createStore(reducer);
axios.defaults.auth = config.auth;

const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

axios.interceptors.response.use(
  function(response) {
    return response;
  },

  function(error) {
    const cant = error.config.url.indexOf("/login") !== -1;
    //console.log(props, "error h");
    if (cant) {
      return Promise.reject(error);
    }

    if (!cant && error.response && error.response.status === 401) {
      let tmp = {
        isLoggedIn: false,
        user: {}
      };
      storage.remove("access_token");
      store.dispatch(signOut());
      store.dispatch(showLoginModal());
      storage.set("user", tmp);
    }

    return Promise.reject(error);
  }
);

export { axios as default, setAuthorizationHeader };
