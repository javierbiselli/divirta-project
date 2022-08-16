import {
  getUsersPending,
  getUsersSuccess,
  getUsersError,
  deleteUserPending,
  deleteUserSuccess,
  deleteUserError,
  addUserPending,
  addUserSuccess,
  addUserError,
  editUserPending,
  editUserSuccess,
  editUserError
} from './actions';

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(getUsersPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      const res = await response.json();
      dispatch(getUsersSuccess(res.data));
      return response.data;
    } catch (error) {
      dispatch(getUsersError(error.toString()));
    }
  };
};

export const deleteUser = (_id) => {
  return async (dispatch) => {
    dispatch(deleteUserPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteUserSuccess(_id));
    } catch (error) {
      dispatch(deleteUserError(error.toString()));
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    dispatch(addUserPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          tel: user.tel,
          password: user.password,
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(addUserSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(addUserError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const editUser = (user, _id) => {
  return async (dispatch) => {
    dispatch(editUserPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          tel: user.tel,
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(editUserSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(editUserError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};
