import { API } from "../utils/consts";

export default [
  {
    NAME: "findAllEmartProducts",
    METHOD: "GET",
    URL: `${API}/api/product/emartproduct/:jumcd/:startwith/:rowcount/:ordercol`
  },
  {
    NAME: "findAllDiscountProducts",
    METHOD: "GET",
    URL: `${API}/api/product/discountproduct/:jumcd/:startwith/:rowcount/:ordercol`
  },
  {
    NAME: "findAllNewProducts",
    METHOD: "GET",
    URL: `${API}/api/product/newproduct/:jumcd/:startwith/:rowcount/:ordercol`
  },
  {
    NAME: "findAllSeasonProducts",
    METHOD: "GET",
    URL: `${API}/api/product/season/:jumcd`,
    REPLACE: "jumcd"
  },
  {
    NAME: "findAllAttributes",
    METHOD: "GET",
    URL: `${API}/api/product/season/attributes`
  },
  {
    NAME: "findAllPromoCats",
    METHOD: "GET",
    URL: `${API}/api/promotionfilter/:promotid`,
    REPLACE: "promotid"
  },
  {
    NAME: "productDetail",
    METHOD: "GET",
    URL: `${API}/api/product/detail/:skucd`,
    REPLACE: "skucd"
  },
  {
    NAME: "productAttribute",
    METHOD: "GET",
    URL: `${API}/api/product/attribute/:skucd`,
    REPLACE: "skucd"
  },
  {
    NAME: "productRelational",
    METHOD: "GET",
    URL: `${API}/api/product/relational/:skucd`,
    REPLACE: "skucd"
  },
  {
    NAME: "productCollection",
    METHOD: "GET",
    URL: `${API}/api/product/collection/:skucd`,
    REPLACE: "skucd"
  },
  {
    NAME: "productComment",
    METHOD: "GET",
    URL: `${API}/api/product/comment/:skucd`,
    REPLACE: "skucd"
  },
  {
    NAME: "productRate",
    METHOD: "GET",
    URL: `${API}/api/product/rate/:skucd`,
    REPLACE: "skucd"
  },
  {
    NAME: "productDetailImg",
    METHOD: "GET",
    URL: `${API}/api/product/detailimg/:skucd`,
    REPLACE: "skucd"
  },
  {
    NAME: "isAvailable",
    METHOD: "GET",
    URL: `${API}/api/product/prodavailablesku/:custid/:skucd/:qty/:iscart`,
    REPLACE: "custid, skucd, qty, iscart"
  },
  {
    NAME: "seasonProductFilter",
    METHOD: "POST",
    URL: `${API}/api/promotionfilter/:id`,
    REPLACE: "id"
  },
  {
    NAME: "addWishList",
    METHOD: "POST",
    URL: `${API}/api/customer/wishlist/:custId/:skucd`,
    REPLACE: "custId, skucd"
  },
  {
    NAME: "addCustomerRate",
    METHOD: "POST",
    URL: `${API}/api/product/rate/:custid/:skucd/:rate`,
    REPLACE: "custid, skucd, rate"
  },
  {
    NAME: "addCutomerComment",
    METHOD: "POST",
    URL: `${API}/api/product/comment/:custid/:skucd/:comment`,
    REPLACE: "custid, skucd, comment"
  },
  {
    NAME: "emartAtt",
    METHOD: "POST",
    URL: `${API}/api/search/att`
  }
];
