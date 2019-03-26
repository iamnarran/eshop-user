import { API } from "../utils/consts";

export default [
  {
    NAME: "findAlls",
    METHOD: "GET",
    URL: `${API}/api/customer/WishList/:custId`,
    REPLACE: "custId"
  }
];
