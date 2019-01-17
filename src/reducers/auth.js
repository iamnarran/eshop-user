import typeToReducer from 'type-to-reducer';

const initialState = {
  user: null
};

export default typeToReducer(
  {
    SET_USER: (state, action) => {
      return { user: action.payload };
    }
  },
  initialState
);
