import api from '../../api';
import Menu from '../../api/Menu';

let actions = {};
Menu.forEach(a => {
  if (a.METHOD !== 'GET') {
    actions[a.NAME] = data => dispatch => api.menu[a.NAME](data);
  }
});

export default actions;
