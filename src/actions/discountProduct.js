import api from "../api";
import discountProduct from "../api/discountProduct";

let actions = {};
discountProduct.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.discountProduct[a.NAME](data);
  }
});

export default actions;
