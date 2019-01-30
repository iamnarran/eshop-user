import api from '../../api';
import Category from '../../api/Category';

let actions = {};
Category.forEach(a => {
  if (a.METHOD !== 'GET') {
    actions[a.NAME] = data => dispatch => api.category[a.NAME](data);
  }
});

export default actions;
