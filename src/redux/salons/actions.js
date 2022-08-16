import {
  GET_SALONS_SUCCESS,
  GET_SALONS_PENDING,
  GET_SALONS_ERROR,
  DELETE_SALON_SUCCESS,
  DELETE_SALON_PENDING,
  DELETE_SALON_ERROR,
  ADD_SALON_SUCCESS,
  ADD_SALON_PENDING,
  ADD_SALON_ERROR,
  EDIT_SALON_SUCCESS,
  EDIT_SALON_PENDING,
  EDIT_SALON_ERROR
} from './constants';

export const getSalonsPending = () => ({
  type: GET_SALONS_PENDING
});

export const getSalonsSuccess = (salons) => ({
  type: GET_SALONS_SUCCESS,
  payload: salons
});

export const getSalonsError = () => ({
  type: GET_SALONS_ERROR
});

export const deleteSalonPending = () => ({
  type: DELETE_SALON_PENDING
});

export const deleteSalonSuccess = (salonId) => ({
  type: DELETE_SALON_SUCCESS,
  payload: salonId
});

export const deleteSalonError = () => ({
  type: DELETE_SALON_ERROR
});

export const addSalonPending = () => ({
  type: ADD_SALON_PENDING
});

export const addSalonSuccess = (salon) => ({
  type: ADD_SALON_SUCCESS,
  payload: salon
});

export const addSalonError = () => ({
  type: ADD_SALON_ERROR
});

export const editSalonPending = () => ({
  type: EDIT_SALON_PENDING
});

export const editSalonSuccess = (salon) => ({
  type: EDIT_SALON_SUCCESS,
  payload: salon
});

export const editSalonError = () => ({
  type: EDIT_SALON_ERROR
});