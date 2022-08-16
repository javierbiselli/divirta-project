import { getUsersSuccess } from "./actions";

export const getUssers = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/`);
      const res = await response.json();
      dispatch(getUsersSuccess(res.data));
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
};