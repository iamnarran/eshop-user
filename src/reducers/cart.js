import typeToReducer from "type-to-reducer";

import { UPDATE_CART } from "../actions/types";

const initialState = {
  totalQty: 0,
  totalPrice: 0
};

export default typeToReducer(
  {
    [UPDATE_CART]: (state, action) => ({
      ...state,
      products: action.payload.products,
      totalQty: action.payload.totalQty,
      totalPrice: action.payload.totalPrice
    })
  },
  initialState
);
