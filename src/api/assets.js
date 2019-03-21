import { API } from "../utils/consts";

const VERSION = config.api.version;

export default [
  {
    NAME: "find",
    METHOD: "GET",
    URL: `${API}/${VERSION}/files`
  },
  {
    NAME: "insert",
    METHOD: "POST",
    URL: `${API}/${VERSION}/files/upload`,
    CONTENT_TYPE: `multipart/form-data`
  },
  {
    NAME: "remove",
    METHOD: "DELETE",
    URL: `${API}/${VERSION}/files/:id`,
    REPLACE: "id"
  }
];
