import api from "../api";
import wishlist from "../api/wishlist";

let actions = {};
wishlist.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.wishlist[a.NAME](data);
  }
});

export default actions;
