import api from "../api";
import category from "../api/category";

let actions = {};
category.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.category[a.NAME](data);
  }
});

export default actions;
