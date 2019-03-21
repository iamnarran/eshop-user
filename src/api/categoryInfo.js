import { API } from "../utils/consts";

export default [
  {
    NAME: "findAllInfo",
    METHOD: "GET",
    URL: `${API}/api/categoryinfo/:id`,
    REPLACE: "id"
  },
  {
    NAME: "findAllFilteredInfo",
    METHOD: "POST",
    URL: `${API}/api/categoryfilter`
  }
];
