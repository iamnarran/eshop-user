import { API } from "../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/customer/WishList/:custId`,
    REPLACE: "custId"
  },
  {
    NAME: "onDelete",
    METHOD: "DELETE",
    URL: `${API}/api/customer/WishList/:custId/:skucd`,
    REPLACE: "custId, skucd"
  }
];
