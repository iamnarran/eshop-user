import typeToReducer from "type-to-reducer";

import { SIGN_IN, SIGN_OUT } from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: null
};

export default typeToReducer(
  {
    [SIGN_IN]: (state, action) => ({
      ...state,
      isLoggedIn: true,
      user: action.payload
    }),
    [SIGN_OUT]: state => ({
      ...state,
      isLoggedIn: false
    })
  },
  initialState
);
