import api from '../api';
import Saleproduct from '../api/Discountproduct';

let actions = {};
Saleproduct.forEach(a => {
  if (a.METHOD !== 'GET') {
    actions[a.NAME] = data => dispatch => api.Saleproduct[a.NAME](data);
  }
});

export default actions;
