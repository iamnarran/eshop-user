import config from 'config';

const API =
  process.env.NODE_ENV === 'development'
    ? config.api.development
    : config.api.production;
    
export default [

  /**ONLY EMART PRODUCT */
  {
    NAME: 'findAllEmartProducts',
    METHOD: 'GET',
    URL: `${API}/api/product/emartproduct/:jumcd`,
    REPLACE: 'id, jumcd',
  },
  
  /**DISCOUNT PRODUCT */
  {
    NAME: 'findAllDiscountProducts',
    METHOD: 'GET',
    URL: `${API}/api/product/discountproduct/:jumcd`,
    REPLACE: 'jumcd',
  },

  /**NEW PRODUCT */
  {
    NAME: 'findAllNewProduct',
    METHOD: 'GET',
    URL: `${API}/api/product/newproduct/:jumcd`,
    REPLACE: 'id, jumcd',
  },

  /**PRODUCT DETAIL */
  {
    NAME: 'productDetail',
    METHOD: 'GET',
    URL: `${API}/api/product/detail/:skucd`,
    REPLACE: 'skucd',
  },

  /**PRODUCT DETAIL */
  {
    NAME: 'productAttribute',
    METHOD: 'GET',
    URL: `${API}/api/product/attribute/:skucd`,
    REPLACE: 'skucd',
  },

  /**PRODUCT RELATIONAL */
  {
    NAME: 'productRelational',
    METHOD: 'GET',
    URL: `${API}/api/product/relational/:skucd`,
    REPLACE: 'skucd',
  },

  /**PRODUCT COLLECTION */
  {
    NAME: 'productCollection',
    METHOD: 'GET',
    URL: `${API}/api/product/collection/:skucd`,
    REPLACE: 'skucd',
  },

  /**PRODUCT COMMENT */
  {
    NAME: 'productComment',
    METHOD: 'GET',
    URL: `${API}/api/product/comment/:skucd`,
    REPLACE: 'skucd',
  },

  /**PRODUCT RATE */
  {
    NAME: 'productRate',
    METHOD: 'GET',
    URL: `${API}/api/product/rate/:skucd`,
    REPLACE: 'skucd',
  }
];