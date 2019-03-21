import api from "../api";
import banner from "../api/Banner/banner";

let actions = {};
banner.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.banner[a.NAME](data);
  }
});

export default actions;
