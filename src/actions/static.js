import api from '../api';
import Static from '../api/Static';

let actions = {};
Static.forEach(a => {
  if (a.METHOD !== 'GET') {
    actions[a.NAME] = data => dispatch => api.staticinfo[a.NAME](data);
  }
});

export default actions;
