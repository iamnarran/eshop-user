import api from "../api";
import newProduct from "../../api/newProduct";

let actions = {};
newProduct.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.Newproduct[a.NAME](data);
  }
});

export default actions;
