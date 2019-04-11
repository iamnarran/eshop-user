import { API } from "../utils/consts";

export default [
  {
    NAME: "findBankInfo",
    METHOD: "GET",
    URL: `${API}/api/Checkout/bankInfo`
  },
  {
    NAME: "findDeliveryTypes",
    METHOD: "GET",
    URL: `${API}/api/Checkout/deliveryTypes`
  },
  {
    NAME: "findUserData",
    METHOD: "GET",
    URL: `${API}/api/customer/:id`,
    REPLACE: "id"
  },
  {
    NAME: "findPaymentTypes",
    METHOD: "GET",
    URL: `${API}/api/Checkout/Paymenttypes`
  },
  {
    NAME: "findBankInfo",
    METHOD: "GET",
    URL: `${API}/api/Checkout/bankinfo`
  },
  {
    NAME: "saveUserAddress",
    METHOD: "POST",
    URL: `${API}/api/customer/address`,
    TOKEN: true
  }
];
