import typeToReducer from "type-to-reducer";

import {
  SET_USER,
  SIGN_OUT,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SHOW_REGISTER_MODAL,
  HIDE_REGISTER_MODAL
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoginModalVisible: false,
  isRegisterModalVisible: false
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
    }),
    [SHOW_LOGIN_MODAL]: state => ({
      ...state,
      isLoginModalVisible: true
    }),
    [HIDE_LOGIN_MODAL]: state => ({
      ...state,
      isLoginModalVisible: false
    }),
    [SHOW_REGISTER_MODAL]: state => ({
      ...state,
      isRegisterModalVisible: true
    }),
    [HIDE_REGISTER_MODAL]: state => ({
      ...state,
      isRegisterModalVisible: false
    })
  },
  initialState
);
