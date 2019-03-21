import api from "../api";
import recipe from "../api/recipe";

let actions = {};
recipe.forEach(a => {
  if (a.METHOD !== "GET") {
    actions[a.NAME] = data => dispatch => api.recipe[a.NAME](data);
  }
});

export default actions;
