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

export const getUsersPending = () => ({
  type: GET_USERS_PENDING
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users
});

export const getUsersError = () => ({
  type: GET_USERS_ERROR
});

export const deleteUserPending = () => ({
  type: DELETE_USER_PENDING
});

export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  payload: userId
});

export const deleteUserError = () => ({
  type: DELETE_USER_ERROR
});

export const addUserPending = () => ({
  type: ADD_USER_PENDING
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user
});

export const addUserError = () => ({
  type: ADD_USER_ERROR
});

export const editUserPending = () => ({
  type: EDIT_USER_PENDING
});

export const editUserSuccess = (user) => ({
  type: EDIT_USER_SUCCESS,
  payload: user
});

export const editUserError = () => ({
  type: EDIT_USER_ERROR
});