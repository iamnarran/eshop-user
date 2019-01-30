import api from '../../api';
import Packages from '../../api/Package';

let actions = {};
Packages.forEach(packageProduct => {
  if (packageProduct.METHOD !== 'GET') {
    actions[packageProduct.NAME] = data => dispatch => api.packageProduct[packageProduct.NAME](data);
  }
});

export default actions;