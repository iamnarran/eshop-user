import typeToReducer from "type-to-reducer";

import {
  SET_USER,
  SIGN_OUT,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoginModalVisible: false
};

export default typeToReducer(
  {
    [SET_USER]: (state, action) => ({
      ...state,
      isLoggedIn: true,
      user: action.payload,
      action: SET_USER
    }),
    [SIGN_OUT]: state => ({
      ...state,
      isLoggedIn: false,
      user: null,
      action: SIGN_OUT
    }),
    [SHOW_LOGIN_MODAL]: state => ({
      ...state,
      isLoginModalVisible: true
    }),
    [HIDE_LOGIN_MODAL]: state => ({
      ...state,
      isLoginModalVisible: false
    })
  },
  initialState
);
