import api, { setAuthorizationHeader } from "../api";
import login from "../api/User/login";
import { storage } from "../utils";
import { SET_USER } from "./types";

export const setUser = user => {
  storage.set("user", user);
  setAuthorizationHeader(user.token);

  return {
    type: SET_USER,
    payload: user
  };
};

export const signOut = () => {
  storage.remove("user");
  setAuthorizationHeader();

  return {
    type: SET_USER,
    payload: null
  };
};

let actions = {};
login.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.login[a.NAME](data);
  }
});

export default actions;
