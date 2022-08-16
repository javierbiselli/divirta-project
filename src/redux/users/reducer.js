import { GET_USERS_SUCCESS } from "./constants";

const initialState = {
    list: [],
    error: false,
  };

  export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS_SUCCESS:
        return {
          ...state,
          list: action.payload,
          };
        default: {
            return state;
          }
    }
  };