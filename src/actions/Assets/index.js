import api from '../api';
import Assets from '../api/Assets';

let actions = {};
Assets.forEach(a => {
  if (a.METHOD !== 'GET') {
    actions[a.NAME] = data => dispatch => api.assets[a.NAME](data);
  }
});

export default actions;
