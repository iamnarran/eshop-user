import api from '../../api';
import Newproduct from '../../api/Newproduct';

let actions = {};
Newproduct.forEach(a => {
  if (a.METHOD !== 'GET') {
    actions[a.NAME] = data => dispatch => api.Newproduct[a.NAME](data);
  }
});

export default actions;
