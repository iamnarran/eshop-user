import typeToReducer from "type-to-reducer";

import { SET_USER, SIGN_OUT } from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: null
};

export default typeToReducer(
  {
    [SET_USER]: (state, action) => ({
      ...state,
      isLoggedIn: true,
      user: action.payload
    }),
    [SIGN_OUT]: state => ({
      ...state,
      isLoggedIn: false,
      user: null
    })
  },
  initialState
);
