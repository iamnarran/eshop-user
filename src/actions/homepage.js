import api from "../api";
import homepage from "../api/homepage";

let actions = {};
homepage.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.homepage[a.NAME](data);
  }
});

export default actions;
