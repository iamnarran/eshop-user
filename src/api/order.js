import { API } from "../utils/consts";

export default [
  {
    NAME: "getAll",
    METHOD: "GET",
    URL: `${API}/api/order/all/:custid`,
    REPLACE: "custid"
  }
];
