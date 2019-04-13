import { API } from "../utils/consts";

export default [
  {
    NAME: "findSuggestion",
    METHOD: "GET",
    URL: `${API}/api/search/:keyword/:rownum`,
    REPLACE: "keyword,rownum"
  },
  {
    NAME: "findHistorySuggestion",
    METHOD: "POST",
    URL: `${API}/api/search/:custid/:word`,
    REPLACE: "custid,word"
  }
];
