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
    URL: `${API}/api/customer/wishlist/:custid`,
    REPLACE: "custid"
  },
  {
    NAME: "deleteWishList",
    METHOD: "DELETE",
    URL: `${API}/api/customer/wishlist/:custid/:skucd`,
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
    URL: `${API}/api/customer/seenlist/:custid/:skucd`,
    REPLACE: "custid, skucd"
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
    URL: `${API}/api/customer/checkchangepass/:email`,
    REPLACE: "email"
  },
  {
    NAME: "putchangepass",
    METHOD: "PUT",
    URL: `${API}/api/customer/putchangepass/:id/:password`,
    REPLACE: "id, password"
  },
  {
    NAME: "checkkey",
    METHOD: "PUT",
    URL: `${API}/api/customer/checkkey/:key`,
    REPLACE: "key"
  },
  {
    NAME: "address",
    METHOD: "GET",
    URL: `${API}/api/customer/address/:custid`,
    REPLACE: "custid",
    TOKEN: true
  },
  {
    NAME: "saveAddress",
    METHOD: "POST",
    URL: `${API}/api/customer/address`,
    TOKEN: true
  },
  {
    NAME: "getCustomer",
    METHOD: "GET",
    URL: `${API}/api/customer/:custid`,
    REPLACE: "custid",
    TOKEN: true
  },
  {
    NAME: "findUserData",
    METHOD: "GET",
    URL: `${API}/api/customer/:id`,
    REPLACE: "id",
    TOKEN: true
  },
  {
    NAME: "deleteAddress",
    METHOD: "DELETE",
    URL: `${API}/api/customer/address/:id/:custid`,
    REPLACE: "id, custid"
  },
  {
    NAME: "updateMainAddress",
    METHOD: "PUT",
    URL: `${API}/api/customer/changeuserimf`,
    TOKEN: true
  },
  {
    NAME: "uploadImage",
    METHOD: "POST",
    URL: `${API}/api/customer/userprofile`
  }
];
