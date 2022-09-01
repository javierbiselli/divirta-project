import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./getSalons.module.css";
import Salon from "../Shared/Salon/Salon";
import { getSalons } from "../../redux/salons/thunks";
import { getUsers } from "../../redux/users/thunks";

const GetSalons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalons());
    dispatch(getUsers());
  }, []);

  const isLoading = useSelector((state) => state.salons.isLoading);
  const listSalons = useSelector((state) => state.salons.list);
  const usersList = useSelector((state) => state.users.list);
  console.log(listSalons);
  console.log(usersList);

  return (
    <>
      {isLoading ? (
        <div>cargando</div>
      ) : (
        <div className={styles.containerSalon}>
          <h2>Salones</h2>
          {listSalons.map((salons) => (
            <Salon
              key={salons._id}
              name={salons.name}
              rate={salons.rate}
              tel={salons.tel}
              salonId={salons._id}
              img={salons.images[0].url}
              topComment={"falta hacer la parte de reviews"}
            />
          ))}
          <div className={styles.tableContainer}></div>
        </div>
      )}
    </>
  );
};

export default GetSalons;
