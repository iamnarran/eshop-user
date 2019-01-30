import api from '../../api';
import Brands from '../../api/Brands';

let actions = {};
Brands.forEach(a => {
  if (a.METHOD !== 'GET') {
    actions[a.NAME] = data => dispatch => api.brand[a.NAME](data);
  }
});

export default actions;
