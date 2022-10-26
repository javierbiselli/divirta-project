import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/users/thunks";
import styles from "./userProfile.module.css";
import DeleteSalon from "./DeleteSalon";

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
    const user = usersList.find(
      (user) => user.firebaseUid === auth.currentUser.uid
    );
    return user;
  };

  const userData = getUserData();

  return (
    <>
      {isLogged() ? (
        <div className={styles.profileContainer}>
          <div>nombre: {userData.name + " " + userData.last_name}</div>
          <div>email: {userData.email}</div>
          <div>telefono: {userData.tel}</div>
          <DeleteSalon userData={userData} getUserData={getUserData} />
        </div>
      ) : (
        <div>espere...</div>
      )}
    </>
  );
};

export default UserProfile;
