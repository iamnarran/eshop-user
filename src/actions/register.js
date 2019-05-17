import api from "../api";
import register from "../api/User/register";
import { SHOW_REGISTER_MODAL, HIDE_REGISTER_MODAL } from "./types";

export const showRegisterModal = () => {
  return {
    type: SHOW_REGISTER_MODAL
  };
};

export const hideRegisterModal = () => {
  return {
    type: HIDE_REGISTER_MODAL
  };
};

let actions = {};
register.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.register[a.NAME](data);
  }
});

export default actions;
