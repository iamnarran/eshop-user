import api from '../api';
import Recipes from '../api/Recipe';

let actions = {};
Recipes.forEach(recipe => {
  if (recipe.METHOD !== 'GET') {
    actions[recipe.NAME] = data => dispatch => api.recipe[recipe.NAME](data);
  }
});

export default actions;