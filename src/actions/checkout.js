import api from "../api";
import checkout from "../api/checkout";

let actions = {};
checkout.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.checkout[a.NAME](data);
  }
});

export default actions;
