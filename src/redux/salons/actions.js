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
  ADD_COMMENTTOSALON_SUCCESS,
  ADD_COMMENTTOSALON_PENDING,
  ADD_COMMENTTOSALON_ERROR,
  DELETE_COMMENTFROMSALON_SUCCESS,
  DELETE_COMMENTFROMSALON_PENDING,
  DELETE_COMMENTFROMSALON_ERROR,
} from "./constants";

export const getSalonsPending = () => ({
  type: GET_SALONS_PENDING,
});

export const getSalonsSuccess = (salons) => ({
  type: GET_SALONS_SUCCESS,
  payload: salons,
});

export const getSalonsError = () => ({
  type: GET_SALONS_ERROR,
});

export const getSalonPending = () => ({
  type: GET_SALON_PENDING,
});

export const getSalonSuccess = (salon) => ({
  type: GET_SALON_SUCCESS,
  payload: salon,
});

export const getSalonError = () => ({
  type: GET_SALON_ERROR,
});

export const deleteSalonPending = () => ({
  type: DELETE_SALON_PENDING,
});

export const deleteSalonSuccess = (salonId) => ({
  type: DELETE_SALON_SUCCESS,
  payload: salonId,
});

export const deleteSalonError = () => ({
  type: DELETE_SALON_ERROR,
});

export const addSalonPending = () => ({
  type: ADD_SALON_PENDING,
});

export const addSalonSuccess = (salon) => ({
  type: ADD_SALON_SUCCESS,
  payload: salon,
});

export const addSalonError = () => ({
  type: ADD_SALON_ERROR,
});

export const editSalonPending = () => ({
  type: EDIT_SALON_PENDING,
});

export const editSalonSuccess = (salon) => ({
  type: EDIT_SALON_SUCCESS,
  payload: salon,
});

export const editSalonError = () => ({
  type: EDIT_SALON_ERROR,
});

export const addSalonToUserPending = () => ({
  type: ADD_SALON_TO_USER_PENDING,
});

export const addSalonToUserSuccess = (user) => ({
  type: ADD_SALON_TO_USER_SUCCESS,
  payload: user,
});

export const addSalonToUserError = () => ({
  type: ADD_SALON_TO_USER_ERROR,
});

export const deleteSalonFromUserPending = () => ({
  type: DELETE_SALON_FROM_USER_PENDING,
});

export const deleteSalonFromUserSuccess = (user) => ({
  type: DELETE_SALON_FROM_USER_SUCCESS,
  payload: user,
});

export const deleteSalonFromUserError = () => ({
  type: DELETE_SALON_FROM_USER_ERROR,
});

export const addCommentToSalonPending = () => ({
  type: ADD_COMMENTTOSALON_PENDING,
});

export const addCommentToSalonSuccess = (comment) => ({
  type: ADD_COMMENTTOSALON_SUCCESS,
  payload: comment,
});

export const addCommentToSalonError = () => ({
  type: ADD_COMMENTTOSALON_ERROR,
});

export const deleteCommentFromSalonPending = () => ({
  type: DELETE_COMMENTFROMSALON_PENDING,
});

export const deleteCommentFromSalonSuccess = (comment) => ({
  type: DELETE_COMMENTFROMSALON_SUCCESS,
  payload: comment,
});

export const deleteCommentFromSalonError = () => ({
  type: DELETE_COMMENTFROMSALON_ERROR,
});
