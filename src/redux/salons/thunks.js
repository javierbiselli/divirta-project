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
  deleteSalonFromUserPending,
  deleteSalonFromUserSuccess,
  deleteSalonFromUserError,
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

export const deleteSalon = (_id, userId) => {
  // return async (dispatch) => {
  //   dispatch(deleteSalonPending());
  //   try {
  //     await fetch(`${process.env.REACT_APP_API_URL}/salons/${_id}`, {
  //       method: "DELETE",
  //     });
  //     dispatch(deleteSalonSuccess(_id));
  //   } catch (error) {
  //     dispatch(deleteSalonError(error.toString()));
  //   }

  return async (dispatch) => {
    dispatch(deleteSalonPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/salons/${_id}`,
        {
          method: "DELETE",
        }
      );
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(deleteSalonSuccess(_id));
      dispatch(deleteSalonFromUserPending());
      const response2 = await fetch(
        `${process.env.REACT_APP_API_URL}/users/add/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            $pop: { ownSalons: [] },
          }),
        }
      );
      const res2 = await response2.json();
      if (res2.error) {
        dispatch(deleteSalonFromUserError(res2.error.toString()));
        return {
          error: true,
          message: res2.error,
        };
      }
      dispatch(deleteSalonFromUserSuccess(res2.data));
      return [res, res2];
    } catch (error) {
      dispatch(deleteSalonError(error.toString()));
      return {
        error: true,
        message: error,
      };
    }
  };
};

export const addSalon = (salon, url, userId) => {
  const date = new Date().toLocaleString("es-AR");
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
      dispatch(addSalonToUserPending());
      const response2 = await fetch(
        `${process.env.REACT_APP_API_URL}/users/add/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            ownSalons: [
              {
                id: res.data._id,
                addedOn: date,
              },
            ],
          }),
        }
      );
      const res2 = await response2.json();
      if (res2.error) {
        dispatch(addSalonToUserError(res2.error.toString()));
        return {
          error: true,
          message: res2.error,
        };
      }
      dispatch(addSalonToUserSuccess(res2.data));
      return [res, res2];
    } catch (error) {
      dispatch(addSalonError(error.toString()));
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
            tel: salon.tel,
            description: salon.description,
            address: salon.address,
            email: salon.email,
            facebook: salon.facebook,
            instagram: salon.instagram,
            whatsapp: salon.whatsapp,
          }),
        }
      );
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(editSalonSuccess(res.data));
      return res;
    } catch (error) {
      dispatch(editSalonError(error.toString()));
      return {
        error: true,
        message: error,
      };
    }
  };
};
