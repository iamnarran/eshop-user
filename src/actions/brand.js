import api from "../api";
import brand from "../../api/brand";

let actions = {};
brand.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.brand[a.NAME](data);
  }
});

export default actions;
