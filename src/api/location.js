import { API } from "../utils/consts";

export default [
  {
    NAME: "findAll",
    METHOD: "GET",
    URL: `${API}/api/systemlocation`
  },
  {
    NAME: "findLocationWidthId",
    METHOD: "GET",
    URL: `${API}/api/systemlocation/:id`,
    REPLACE: "id"
  },
  {
    NAME: "findCommiteLocation",
    METHOD: "GET",
    URL: `${API}/api/systemlocation/committe/:provid/:distid`,
    REPLACE: "provid, distid"
  }
];
