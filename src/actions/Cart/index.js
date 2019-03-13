import api from "../api";
import Cart from "../api/Cart";

let actions = {};
Cart.forEach(cart => {
  if (cart.METHOD !== "GET") {
    actions[cart.NAME] = data => dispatch => api.cart[cart.NAME](data);
  }
});

export default actions;
