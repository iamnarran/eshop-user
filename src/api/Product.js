import config from 'config';

const API =
  process.env.NODE_ENV === 'development'
    ? config.api.development
    : config.api.production;
    
export default [
  {
    NAME: 'findAllEmartProducts',
    METHOD: 'GET',
    URL: `${API}/api/product/emartproduct/:jumcd`,
    REPLACE: 'id, jumcd',
  },
  {
    NAME: 'findAllDiscountProducts',
    METHOD: 'GET',
    URL: `${API}/api/product/discountproduct/:jumcd`,
    REPLACE: 'jumcd',
  },
];