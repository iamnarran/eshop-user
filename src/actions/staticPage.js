import api from "../api";
import staticPage from "../api/staticPage";

let actions = {};
staticPage.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.staticPage[a.NAME](data);
  }
});

export default actions;
