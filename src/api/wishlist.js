import { API } from "../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/customer/wishlist/:custid`,
    REPLACE: "custid"
  }
];
