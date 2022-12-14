import {
  GET_SALONS_SUCCESS,
  GET_SALONS_PENDING,
  GET_SALONS_ERROR,
  GET_SALON_SUCCESS,
  GET_SALON_PENDING,
  GET_SALON_ERROR,
  DELETE_SALON_SUCCESS,
  DELETE_SALON_PENDING,
  DELETE_SALON_ERROR,
  ADD_SALON_SUCCESS,
  ADD_SALON_PENDING,
  ADD_SALON_ERROR,
  EDIT_SALON_SUCCESS,
  EDIT_SALON_PENDING,
  EDIT_SALON_ERROR,
  ADD_SALON_TO_USER_PENDING,
  ADD_SALON_TO_USER_SUCCESS,
  ADD_SALON_TO_USER_ERROR,
  DELETE_SALON_FROM_USER_SUCCESS,
  DELETE_SALON_FROM_USER_PENDING,
  DELETE_SALON_FROM_USER_ERROR,
  ADD_COMMENTTOSALON_PENDING,
  ADD_COMMENTTOSALON_SUCCESS,
  ADD_COMMENTTOSALON_ERROR,
  DELETE_COMMENTFROMSALON_SUCCESS,
  DELETE_COMMENTFROMSALON_PENDING,
  DELETE_COMMENTFROMSALON_ERROR,
} from "./constants";

const initialState = {
  list: [],
  salon: {},
  isLoading: false,
  error: false,
};

export const salonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALONS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SALONS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case GET_SALONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case GET_SALON_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SALON_SUCCESS:
      return {
        ...state,
        salon: action.payload,
        isLoading: false,
      };
    case GET_SALON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case DELETE_SALON_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_SALON_SUCCESS:
      return {
        ...state,
        list: state.list.filter((a) => a._id !== action.payload),
        isLoading: false,
      };
    case DELETE_SALON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case ADD_SALON_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_SALON_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
      };
    case ADD_SALON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case EDIT_SALON_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_SALON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((a) => {
          if (a._id === action.payload._id) {
            return action.payload;
          }
          return a;
        }),
      };
    case EDIT_SALON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case ADD_SALON_TO_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_SALON_TO_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((a) => {
          if (a._id === action.payload._id) {
            return action.payload;
          }
          return a;
        }),
      };
    case ADD_SALON_TO_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case DELETE_SALON_FROM_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_SALON_FROM_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((a) => a._id !== action.payload),
      };

    case DELETE_SALON_FROM_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    case ADD_COMMENTTOSALON_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_COMMENTTOSALON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((a) => {
          if (a._id === action.payload._id) {
            return action.payload;
          }
          return a;
        }),
      };
    case ADD_COMMENTTOSALON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    case DELETE_COMMENTFROMSALON_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_COMMENTFROMSALON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((a) => a._id !== action.payload),
      };
    case DELETE_COMMENTFROMSALON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default: {
      return state;
    }
  }
};
