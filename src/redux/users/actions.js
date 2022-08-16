import { GET_USERS_SUCCESS } from "./constants";

export const getUsersSuccess = (users) => ({
    type: GET_USERS_SUCCESS,
    payload: users
  });