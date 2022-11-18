import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import styles from "./userProfile.module.css";
import DeleteSalon from "./DeleteSalon";
import { useEffect } from "react";
import { getUsers } from "../../redux/users/thunks";
import Loader from "../Shared/Loader/Loader";

const UserProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const usersList = useSelector((state) => state.users.list);

  const isLogged = () => {
    const user = getAuth();
    if (user.currentUser == null) {
      return false;
    } else {
      return true;
    }
  };
  const getUserData = () => {
    const auth = getAuth();
    if (isLogged()) {
      const user = usersList.find(
        (user) => user.firebaseUid === auth.currentUser.uid
      );
      return user;
    } else {
      return false;
    }
  };

  const userData = getUserData();

  return (
    <>
      {userData ? (
        <div className={styles.profileContainer}>
          <div>nombre: {userData.name + " " + userData.last_name}</div>
          <div>email: {userData.email}</div>
          <div>telefono: {userData.tel}</div>
          <h4>Mis salones:</h4>
          <DeleteSalon userData={userData} getUserData={getUserData} />
        </div>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default UserProfile;
