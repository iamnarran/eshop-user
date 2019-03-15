import api from "../../api";
import Cart from "../../api/Cart";
import { UPDATE_CART } from "../types";

export const updateCart = productInfo => {
  return {
    type: UPDATE_CART,
    payload: productInfo
  };
};

let actions = {};
Cart.forEach(cart => {
  if (cart.METHOD !== "GET") {
    actions[cart.NAME] = data => dispatch => api.cart[cart.NAME](data);
  }
});

export default actions;
