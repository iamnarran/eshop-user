import { API } from "../utils/consts";

export default [
  {
    NAME: "getViewList",
    METHOD: "GET",
    URL: `${API}/api/customer/viewlist/:custid`,
    REPLACE: "custid"
  },
  {
    NAME: "addViewList",
    METHOD: "POST",
    URL: `${API}/api/customer/viewlist/:custid/:skucd`,
    REPLACE: "custid, skucd"
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
    URL: `${API}/api/customer/wishList/:custid/:skucd`,
    REPLACE: "custid, skucd"
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
    URL: `${API}/api/customer/seenList/:custId/:skucd`,
    REPLACE: "custId, skucd"
  },
  {
    NAME: "passreset",
    METHOD: "PUT",
    URL: `${API}/api/customer/passreset`,
    TOKEN: true
  },
  {
    NAME: "checkmail",
    METHOD: "PUT",
    URL: `${API}/api/customer/checkchangemail/:email`,
    REPLACE: "email"
  },
  {
    NAME: "putchangepass",
    METHOD: "PUT",
    URL: `${API}/api/customer/putchangepass/:id/:password`,
    REPLACE: "id, password"
  }
];
