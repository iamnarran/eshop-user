import api from '../api';
import Homepage from '../api/Homepage';

let actions = {};
Homepage.forEach(a => {
  if (a.METHOD !== 'GET') {
    actions[a.NAME] = data => dispatch => api.homepage[a.NAME](data);
  }
});

export default actions;
