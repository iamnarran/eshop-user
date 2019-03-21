import api from "../api";
import cart from "../api/cart";
import { UPDATE_CART } from "./types";

export const updateCart = productInfo => {
  return {
    type: UPDATE_CART,
    payload: productInfo
  };
};

let actions = {};
cart.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.cart[a.NAME](data);
  }
});

export default actions;
