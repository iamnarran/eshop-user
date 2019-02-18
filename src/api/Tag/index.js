import { API } from "../../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/tag/:slug`,
    REPLACE: "id, slug"
  }
];
