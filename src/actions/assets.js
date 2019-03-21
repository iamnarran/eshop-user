import api from "../api";
import assets from "../api/assets";

let actions = {};
assets.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.assets[a.NAME](data);
  }
});

export default actions;
