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
  }
];
