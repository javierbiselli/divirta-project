import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/users/thunks";
import styles from "./userProfile.module.css";
import DeleteSalon from "./DeleteSalon";

const UserProfile = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users.list);
  const isLoading = useSelector((state) => state.users.isLoading);

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

  useEffect(() => {
    dispatch(getUsers());
    getUserData();
  }, [isLoading]);

  return (
    <>
      {getUserData() ? (
        <div className={styles.profileContainer}>
          <div>nombre: {userData.name + " " + userData.last_name}</div>
          <div>email: {userData.email}</div>
          <div>telefono: {userData.tel}</div>
          <h4>Mis salones:</h4>
          <DeleteSalon userData={userData} getUserData={getUserData} />
        </div>
      ) : (
        <div>espere...</div>
      )}
    </>
  );
};

export default UserProfile;
