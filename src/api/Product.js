import config from 'config';

const API =
  process.env.NODE_ENV === 'development'
    ? config.api.development
    : config.api.production;
    
export default [
  {
    NAME: 'findAllEmartProducts',
    METHOD: 'GET',
    URL: `${API}/api/product/emartproduct/01`,
    // REPLACE: 'jumcd',
  },
  {
    NAME: 'findAllDiscountProducts',
    METHOD: 'GET',
    URL: `${API}/api/product/saleproduct/01`,
    // REPLACE: 'jumcd',
  },
  {
    NAME: 'findAllPackageProducts',
    METHOD: 'GET',
    URL: `${API}/api/product/saleproduct/01`,
    // REPLACE: 'jumcd',
  },
];