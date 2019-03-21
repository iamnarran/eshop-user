import api from '../api';
import location from '../api/Location';

let actions = {};
location.forEach(a => {
  if (a.METHOD !== 'GET') {
    actions[a.NAME] = data => dispatch => api.location[a.NAME](data);
  }
});

export default actions;