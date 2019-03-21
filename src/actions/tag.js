import api from "../api";
import tag from "../api/tag";

let actions = {};
tag.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.tag[a.NAME](data);
  }
});

export default actions;
