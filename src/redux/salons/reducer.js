import { GET_SALONS_SUCCESS } from './constants.js';

const initialState = {
    list: [],
    isLoading: false,
    error: false
  };

  export const salonsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SALONS_SUCCESS:
        return {
          ...state,
          list: action.payload,
          isLoading: false
          };
        default: {
            return state;
          }
    }
  };