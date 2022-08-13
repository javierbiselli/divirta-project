import { GET_SALONS_SUCCESS } from './constants';

export const getSalonsSuccess = (salons) => ({
    type: GET_SALONS_SUCCESS,
    payload: salons
  });