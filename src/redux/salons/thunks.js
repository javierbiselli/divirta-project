import {
  getSalonsPending,
  getSalonsSuccess,
  getSalonsError,
  deleteSalonPending,
  deleteSalonSuccess,
  deleteSalonError,
  addSalonPending,
  addSalonSuccess,
  addSalonError,
  editSalonPending,
  editSalonSuccess,
  editSalonError,
  addSalonToUserPending,
  addSalonToUserSuccess,
  addSalonToUserError,
} from "./actions";

export const getSalons = () => {
  return async (dispatch) => {
    dispatch(getSalonsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/salons`);
      const res = await response.json();
      dispatch(getSalonsSuccess(res.data));
      return response.data;
    } catch (error) {
      dispatch(getSalonsError(error.toString()));
    }
  };
};

export const deleteSalon = (_id) => {
  return async (dispatch) => {
    dispatch(deleteSalonPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/salons/${_id}`, {
        method: "DELETE",
      });
      dispatch(deleteSalonSuccess(_id));
    } catch (error) {
      dispatch(deleteSalonError(error.toString()));
    }
  };
};

export const addSalon = (salon, url, userId) => {
  return async (dispatch) => {
    dispatch(addSalonPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/salons`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: salon.name,
          tel: salon.tel,
          address: salon.address,
          rate: salon.rate,
          images: [{ url }],
          facebook: salon.facebook,
          instagram: salon.instagram,
          whatsapp: salon.whatsapp,
          email: salon.email,
          description: salon.description,
          owner: userId,
        }),
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(addSalonSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(addSalonError(error.toString()));
      return {
        error: true,
        message: error,
      };
    }
  };
};

export const addSalonToUser = (userId, salonId) => {
  const date = new Date();
  console.log("date", date);
  return async (dispatch) => {
    dispatch(addSalonToUserPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/add/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            ownSalons: [
              {
                id: salonId,
                addedOn: date,
              },
            ],
          }),
        }
      );
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      console.log(res);
      dispatch(addSalonToUserSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(addSalonToUserError(error.toString()));
      return {
        error: true,
        message: error,
      };
    }
  };
};

export const editSalon = (salon, _id) => {
  return async (dispatch) => {
    dispatch(editSalonPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/salons/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: salon.name,
            rate: salon.rate,
            tel: salon.tel,
            address: salon.address,
          }),
        }
      );
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(editSalonSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(editSalonError(error.toString()));
      return {
        error: true,
        message: error,
      };
    }
  };
};
