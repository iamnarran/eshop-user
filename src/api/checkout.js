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
    REPLACE: "id",
    TOKEN: true
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
  },
  {
    NAME: "saveCustomerCard",
    METHOD: "POST",
    URL: `${API}/api/customer/card/:custid/:cardno/:pincode`,
    REPLACE: "custid, cardno, pincode",
    TOKEN: true
  },
  {
    NAME: "getCompanyRegno",
    METHOD: "GET",
    URL: `${API}/api/order/company/:regNo`,
    REPLACE: "regNo",
    TOKEN: true
  },
  {
    NAME: "getepoint",
    METHOD: "GET",
    URL: `${API}/api/customer/card/:custId`,
    REPLACE: "custId",
    TOKEN: true
  },
  {
    NAME: "checkpass",
    METHOD: "GET",
    URL: `${API}/api/customer/card/pin/:cardno/:pincode`,
    REPLACE: "cardno, pincode",
    TOKEN: true
  },
  {
    NAME: "sentPayment",
    METHOD: "POST",
    URL: `${API}/api/order`,
    TOKEN: true
  },
  {
    NAME: "getlocs",
    METHOD: "GET",
    URL: `${API}/api/customer/address/loc/:locid`,
    REPLACE: "locid",
    TOKEN: true
  },
  {
    NAME: "checkPayment",
    METHOD: "GET",
    URL: `${API}/api/order/qpay/:id`,
    REPLACE: "id",
    TOKEN: true
  }
];
