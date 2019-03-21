import api from "../api";
import register from "../api/User/register";

let actions = {};
register.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.register[a.NAME](data);
  }
});

export default actions;
