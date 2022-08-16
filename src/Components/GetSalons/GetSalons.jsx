import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./getSalons.module.css";
import Salon from "../Shared/Salon/Salon";
import { getSalons } from "../../redux/salons/thunks";

const GetSalons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalons());
  }, []);

  const isLoading = useSelector((state) => state.salons.isLoading);
  const listSalons = useSelector((state) => state.salons.list);
  console.log(listSalons);

    return (
    <>
    {isLoading ? <div>cargando</div> : (
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
    </div>)}
    </>
  );
};

export default GetSalons;
