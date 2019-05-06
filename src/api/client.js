import axios from "axios";
import config from "../config";
import { storage } from "../utils";

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

    if (cant) {
      return Promise.reject(error);
    }

    if (!cant && error.response && error.response.status === 401) {
      setTimeout(() => {
        storage.remove("user");
        window.location.href = "/";
      }, 2000);
    }

    return Promise.reject(error);
  }
);

export { axios as default, setAuthorizationHeader };
