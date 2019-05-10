import api, { setAuthorizationHeader } from "../api";
import login from "../api/User/login";
import {
  SET_USER,
  SIGN_OUT,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL
} from "./types";

export const setUser = user => {
  setAuthorizationHeader(user.token);
  return {
    type: SET_USER,
    payload: user
  };
};

export const signOut = () => {
  setAuthorizationHeader();
  return {
    type: SIGN_OUT
  };
};

export const showLoginModal = () => {
  return {
    type: SHOW_LOGIN_MODAL
  };
};

export const hideLoginModal = () => {
  return {
    type: HIDE_LOGIN_MODAL
  };
};

let actions = {};
login.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.login[a.NAME](data);
  }
});

export default actions;
