import typeToReducer from "type-to-reducer";

import { UPDATE_CART } from "../actions/types";
import storage from "../utils/storage";

const initialState = {
  totalQtyInCart: storage.get("cart") ? storage.get("cart").totalQty || 0 : 0,
  totalPriceInCart: storage.get("cart")
    ? storage.get("cart").totalPrice || 0
    : 0
};

export default typeToReducer(
  {
    [UPDATE_CART]: (state, action) => ({
      ...state,
      products: action.payload.products,
      totalQtyInCart: action.payload.totalQty,
      totalPriceInCart: action.payload.totalPrice
    })
  },
  initialState
);
