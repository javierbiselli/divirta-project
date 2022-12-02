import { useEffect } from "react";
import styles from "./salonFull.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSalonById } from "../../../redux/salons/thunks";
import Loader from "../Loader/Loader";

const SalonFull = () => {
  const dispatch = useDispatch();

  const salonId = window.location.href.slice(-24);

  useEffect(() => {
    dispatch(getSalonById(salonId));
    console.log("useeffect salon ejecutado");
  }, []);

  const salon = useSelector((state) => state.salons.salon);
  const isLoading = useSelector((state) => state.salons.isLoading);

  console.log(salon);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !salon.name ? (
        <div className={styles.errorContainer}>
          error 404 este salon no existeeeeeeeeeeeee!!!11!!!1!!!unouno
        </div>
      ) : (
        <div className={styles.salonFullContainer}>
          {salon.name} <div>work in progress, volve mas tardeeee</div>
        </div>
      )}
    </>
  );
};
export default SalonFull;
