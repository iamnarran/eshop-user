import api from "../api";
import widget from "../api/widget";

let actions = {};
widget.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.widget[a.NAME](data);
  }
});

export default actions;
