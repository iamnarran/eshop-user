import { API } from "../utils/consts";

export default [
  {
    NAME: "findAllProducts",
    METHOD: "GET",
    URL: `${API}/api/basket/:custid`,
    REPLACE: "custid",
    TOKEN: true
  },
  {
    NAME: "updateProduct",
    METHOD: "PUT",
    URL: `${API}/api/basket/:custid`,
    REPLACE: "custid",
    TOKEN: true
  },
  {
    NAME: "removeProduct",
    METHOD: "DELETE",
    URL: `${API}/api/basket/:custid/:skucd`,
    REPLACE: "custid, skucd",
    TOKEN: true
  }
];
