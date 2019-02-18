import { API } from "../../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/homepagebanner/:type`,
    REPLACE: "id, type"
  }
];
