import api from '../../api';
import Products from '../../api/Product';

let actions = {};
Products.forEach(product => {
  if (product.METHOD !== 'GET') {
    actions[product.NAME] = data => dispatch => api.product[product.NAME](data);
  }
});

export default actions;