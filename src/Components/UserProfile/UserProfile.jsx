import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/users/thunks";
import styles from "./userProfile.module.css";

const UserProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers);
  }, []);

  const usersList = useSelector((state) => state.users.list);

  const getUserData = () => {
    const auth = getAuth();
    const user = usersList.find(
      (user) => user.firebaseUid === auth.currentUser.uid
    );
    console.log(user);
    return user;
  };

  const date = getUserData().ownSalons[0].addedOn;
  const dateSliced = date.slice(0, 10);

  return (
    <>
      <div className={styles.container}>
        nombre: {getUserData().name + " " + getUserData().last_name}
      </div>
      <div>email: {getUserData().email}</div>
      <div>telefono: {getUserData().tel}</div>
      <div>
        Mi salon:{" "}
        {!getUserData().ownSalons[0].id
          ? "no tenes ningun salon"
          : getUserData().ownSalons[0].id.name}
      </div>
      <div>
        {!getUserData().ownSalons[0].id ? "" : `agregado el: ${dateSliced}`}
      </div>
    </>
  );
};

export default UserProfile;
