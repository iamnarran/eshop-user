import { API } from "../utils/consts";

export default [
  {
    NAME: "findAlls",
    METHOD: "GET",
    URL: `${API}/api/customer/ViewList/:custId`,
    REPLACE: "custId"
  },
  {
    NAME: "addViewList",
    METHOD: "POST",
    URL: `${API}/api/customer/viewList/:custId/:skucd`,
    REPLACE: "custId, skucd"
  }
];
