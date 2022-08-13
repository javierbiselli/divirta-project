import { getSalonsSuccess } from './actions';

export const getSalons = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/salons`);
        const res = await response.json();
        dispatch(getSalonsSuccess(res.data));
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
  };
