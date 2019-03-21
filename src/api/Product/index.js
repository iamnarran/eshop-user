import { API } from "../../utils/consts";

export default [
  /**ONLY EMART PRODUCT */
  {
    NAME: "findAllEmartProducts",
    METHOD: "GET",
    URL: `${API}/api/product/emartproduct/:jumcd`,
    REPLACE: "jumcd"
  },

  /**DISCOUNT PRODUCT */
  {
    NAME: "findAllDiscountProducts",
    METHOD: "GET",
    URL: `${API}/api/product/discountproduct/:jumcd`,
    REPLACE: "jumcd"
  },

  /**NEW PRODUCT */
  {
    NAME: "findAllNewProducts",
    METHOD: "GET",
    URL: `${API}/api/product/newproduct/:jumcd`,
    REPLACE: "jumcd"
  },

  /**SEASON PRODUCT */
  {
    NAME: "findAllSeasonProducts",
    METHOD: "GET",
    URL: `${API}/api/product/season/:jumcd`,
    REPLACE: "jumcd"
  },

  /**SEASON PRODUCT ATTRIBUTES */
  {
    NAME: "findAllAttributes",
    METHOD: "GET",
    URL: `${API}/api/product/season/attributes`
  },

  /**SEASON PROMOTION CATEGORIES */
  {
    NAME: "findAllPromoCats",
    METHOD: "GET",
    URL: `${API}/api/product/season/promocats`
  },

  /**PRODUCT DETAIL */
  {
    NAME: "productDetail",
    METHOD: "GET",
    URL: `${API}/api/product/detail/:skucd`,
    REPLACE: "skucd"
  },

  /**PRODUCT DETAIL */
  {
    NAME: "productAttribute",
    METHOD: "GET",
    URL: `${API}/api/product/attribute/:skucd`,
    REPLACE: "skucd"
  },

  /**PRODUCT RELATIONAL */
  {
    NAME: "productRelational",
    METHOD: "GET",
    URL: `${API}/api/product/relational/:skucd`,
    REPLACE: "skucd"
  },

  /**PRODUCT COLLECTION */
  {
    NAME: "productCollection",
    METHOD: "GET",
    URL: `${API}/api/product/collection/:skucd`,
    REPLACE: "skucd"
  },

  /**PRODUCT COMMENT */
  {
    NAME: "productComment",
    METHOD: "GET",
    URL: `${API}/api/product/comment/:skucd`,
    REPLACE: "skucd"
  },

  /**PRODUCT RATE */
  {
    NAME: "productRate",
    METHOD: "GET",
    URL: `${API}/api/product/rate/:skucd`,
    REPLACE: "skucd"
  },

  /**PRODUCT RATE */
  {
    NAME: "productDetailImg",
    METHOD: "GET",
    URL: `${API}/api/product/detailimg/:skucd`,
    REPLACE: "skucd"
  },

  /**AVAILABILITY */
  {
    NAME: "isAvailable",
    METHOD: "GET",
    URL: `${API}/api/product/ProdAvailableSku/:skucd/:qty`,
    REPLACE: "skucd,qty"
  },
  //Filter Controller
  {
    NAME: "seasonProductFilter",
    METHOD: "POST",
    URL: `${API}/api/promotionfilter/:id`,
    REPLACE: "id"
  }
];
