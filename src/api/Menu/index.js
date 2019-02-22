import { API } from "../../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/menu`
  },
  {
    NAME: "findOne",
    METHOD: "GET",
    URL: `${API}/api/menu/:slug`,
    REPLACE: "slug"
  }
];
