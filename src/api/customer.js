import { API } from "../utils/consts";

export default [
  {
    NAME: "getViewList",
    METHOD: "GET",
    URL: `${API}/api/customer/viewList/:custId`,
    REPLACE: "custId"
  },
  {
    NAME: "addViewList",
    METHOD: "POST",
    URL: `${API}/api/customer/viewList/:custId/:skucd`,
    REPLACE: "custId, skucd"
  },
  {
    NAME: "getWishList",
    METHOD: "GET",
    URL: `${API}/api/customer/wishList/:custid`,
    REPLACE: "custid"
  },
  {
    NAME: "deleteWishList",
    METHOD: "DELETE",
    URL: `${API}/api/customer/wishList/:custId/:skucd`,
    REPLACE: "custId, skucd"
  },
  {
    NAME: "getOrderList",
    METHOD: "GET",
    URL: `${API}/api/order/all/:custid`,
    REPLACE: "custid",
    TOKEN: true
  },
  {
    NAME: "getOrderDetail",
    METHOD: "GET",
    URL: `${API}/api/order/detail/:ordid`,
    REPLACE: "ordid",
    TOKEN: true
  },
  {
    NAME: "deleteSeenList",
    METHOD: "DELETE",
    URL: `${API}/api/customer/seenList/:custid/:skucd`,
    REPLACE: "custid, skucd"
  }
];
