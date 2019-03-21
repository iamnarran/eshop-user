import { API } from "../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/package`
  },
  {
    NAME: "findProducts",
    METHOD: "GET",
    URL: `${API}/api/package/:id`,
    REPLACE: "id"
  },
  {
    NAME: "findImf",
    METHOD: "GET",
    URL: `${API}/api/packageImf/:id`,
    REPLACE: "id"
  },
  {
    NAME: 'findWishList',
    METHOD: "GET",
    URL: `${API}/api/wishlist/:id`,
    REPLACE: "id"
  }
];
