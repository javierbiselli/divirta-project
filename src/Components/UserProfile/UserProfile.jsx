import styles from "./userProfile.module.css";
import DeleteSalon from "./DeleteSalon";
import Loader from "../Shared/Loader/Loader";

const UserProfile = () => {
  const userData = JSON.parse(window.localStorage.getItem("user"));
  return (
    <>
      {userData ? (
        <div className={styles.profileContainer}>
          <div>nombre: {userData.name + " " + userData.last_name}</div>
          <div>email: {userData.email}</div>
          <div>telefono: {userData.tel}</div>
          <h4>Mis salones:</h4>
          <DeleteSalon userData={userData} />
        </div>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default UserProfile;
