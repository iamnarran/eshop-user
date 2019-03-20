import { API } from "../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/staticPages`
  },
  {
    NAME: "findPage",
    METHOD: "GET",
    URL: `${API}/api/staticPages/:id`,
    REPLACE: "id"
  }
];
