import api, { setAuthorizationHeader } from "../../api";
import Login from "../../api/User/login";
import { storage } from "../../utils";
import { SET_USER } from "../types";

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
Login.forEach(login => {
  if (login.METHOD !== "GET") {
    actions[login.NAME] = data => dispatch => api.login[login.NAME](data);
  }
});

export default actions;
