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

  const userData = getUserData();

  return (
    <>
      <div className={styles.container}>
        nombre: {userData.name + " " + userData.last_name}
      </div>
      <div>email: {userData.email}</div>
      <div>telefono: {userData.tel}</div>
      <div>
        {!userData.ownSalons[0]
          ? "no tenes ningun salon"
          : userData.ownSalons.map(
              (salons) =>
                " Salon: " +
                salons.id.name +
                ", agregado en: " +
                salons.addedOn.slice(0, 10)
            )}
      </div>
    </>
  );
};

export default UserProfile;
