import api from "../api";
import season from "../api/season";

let actions = {};
season.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.season[a.NAME](data);
  }
});

export default actions;
