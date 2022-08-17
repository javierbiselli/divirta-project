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
      <h1>Salones</h1>
      {listSalons.map((salons) =>
      <Salon key={salons._id}
        name={salons.name}
        rate={salons.rate}
        tel={salons.tel}
        img={"https://www.viewhotels.jp/ryogoku/wp-content/uploads/sites/9/2020/03/test-img.jpg"}
        topComment={'falta hacer la parte de reviews'}/>)}
      <div className={styles.tableContainer}>
      </div>
    </div>)}
    </>
  );
};

export default GetSalons;
