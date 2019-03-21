import api from "../api";
import menu from "../api/menu";

let actions = {};
menu.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.menu[a.NAME](data);
  }
});

export default actions;
