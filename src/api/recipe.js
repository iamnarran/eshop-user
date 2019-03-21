import { API } from "../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/cookrecipe`
  },
  {
    NAME: "findOne",
    METHOD: "GET",
    URL: `${API}/api/cookrecipe/:id`,
    REPLACE: "id"
  },
  {
    NAME: "findAllProducts",
    METHOD: "GET",
    URL: `${API}/api/cookrecipe/:id/products`,
    REPLACE: "id"
  },
  {
    NAME: "isAvailable",
    METHOD: "GET",
    URL: `${API}/product/prodavailablerecipe/:id`,
    REPLACE: "id"
  }
];
