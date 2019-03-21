import api from "../api";
import staticInfo from "../api/staticInfo";

let actions = {};
staticInfo.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.staticInfo[a.NAME](data);
  }
});

export default actions;
