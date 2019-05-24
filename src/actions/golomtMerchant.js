import api from "../api";
import golomtMerchant from "../api/golomtMerchant";

let actions = {};
golomtMerchant.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.golomtMerchant[a.NAME](data);
  }
});

export default actions;
