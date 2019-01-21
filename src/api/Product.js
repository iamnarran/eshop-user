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
    // REPLACE: 'jumcd, jumcd',
  },
  {
    NAME: 'findAllSaleProducts',
    METHOD: 'GET',
    URL: `${API}/api/product/saleproduct/01`,
  },
  {
    NAME: 'findAllNewProducts',
    METHOD: 'GET',
    URL: `${API}/api/product/newproduct/01`,
  }
];