import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./getSalons.module.css";
import { getSalons } from "../../redux/salons/thunks";
import Salon from "../Shared/Salon/Salon";

const GetSalons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalons());
  }, []);

  const listSalons = useSelector((state) => state.salons.list);
  console.log(listSalons);

  return (
    <div className={styles.containerSalon}>
      <h1>Salones mejores puntuados</h1>
      <Salon
        // name={listSalons[0].name}
        // rate={listSalons[0].rate}
        // tel={listSalons[0].tel}
        img={"aca iria una imagen"}
        topComment={'buen salon'}/>
      <div className={styles.tableContainer}>
      </div>
    </div>
  );
};

export default GetSalons;
