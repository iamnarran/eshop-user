import { API } from "../../utils/consts";

export default [
  {
    NAME: "findProducts",
    METHOD: "GET",
    URL: `${API}/api/categoryinfo/:id`,
    REPLACE: "id"
  }
];
