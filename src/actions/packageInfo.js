import api from "../api";
import packageInfo from "../api/packageInfo";

let actions = {};
packageInfo.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.packageInfo[a.NAME](data);
  }
});

export default actions;
