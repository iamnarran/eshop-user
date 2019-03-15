import { API } from "../../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/categorymenu`
  },
  {
    NAME: "filter",
    METHOD: "POST",
    URL: `${API}/api/categoryfilter`
  }
];
