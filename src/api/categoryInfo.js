import { API } from "../utils/consts";

export default [
  {
    NAME: "findAllInfo",
    METHOD: "GET",
    URL: `${API}/api/categoryinfo/:id/:rowcount/:ordercol`,
    REPLACE: "id, rowcount, ordercol"
  },
  {
    NAME: "findAllFilteredInfo",
    METHOD: "POST",
    URL: `${API}/api/categoryfilter`
  }
];
