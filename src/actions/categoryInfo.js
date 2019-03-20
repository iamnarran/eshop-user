import api from "../api";
import categoryInfo from "../api/categoryInfo";

let actions = {};
categoryInfo.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.categoryInfo[a.NAME](data);
  }
});

export default actions;
