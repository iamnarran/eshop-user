import { API } from "../../utils/consts";

export default [
  /**ONLY EMART PRODUCT */
  {
    NAME: "findAllEmartProducts",
    METHOD: "GET",
    URL: `${API}/api/product/emartproduct/:jumcd`,
    REPLACE: "id, jumcd"
  },

  /**DISCOUNT PRODUCT */
  {
    NAME: "findAllDiscountProducts",
    METHOD: "GET",
    URL: `${API}/api/product/discountproduct/:jumcd`,
    REPLACE: "id, jumcd"
  },

  /**NEW PRODUCT */
  {
    NAME: "findAllNewProducts",
    METHOD: "GET",
    URL: `${API}/api/product/newproduct/:jumcd`,
    REPLACE: "id, jumcd"
  }
];
