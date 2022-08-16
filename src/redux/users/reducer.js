import {
  GET_USERS_SUCCESS,
  GET_USERS_PENDING,
  GET_USERS_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_PENDING,
  DELETE_USER_ERROR,
  ADD_USER_SUCCESS,
  ADD_USER_PENDING,
  ADD_USER_ERROR,
  EDIT_USER_SUCCESS,
  EDIT_USER_PENDING,
  EDIT_USER_ERROR
} from './constants';


const initialState = {
  list: [],
  isLoading: false,
  error: false
};

  export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case DELETE_USER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        list: state.list.filter((a) => a._id !== action.payload),
        isLoading: false
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_USER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case EDIT_USER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((a) => {
          if (a._id === action.payload._id) {
            return action.payload;
          }
          return a;
        })
      };
    case EDIT_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    default: {
      return state;
    }
  }
};