import api from "../api";
import product from "../api/product";

let actions = {};
product.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.product[a.NAME](data);
  }
});

export default actions;
