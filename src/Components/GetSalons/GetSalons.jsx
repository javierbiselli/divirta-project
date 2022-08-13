import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./getSalons.module.css";
import { getSalons } from "../../redux/salons/thunks";

const GetSalons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalons());
  }, []);

  const listSalons = useSelector((state) => state.salons.list);
  console.log(listSalons);

  return (
    <div className={styles.container}>
      <h1>Ver salones</h1>
      <div className={styles.tableContainer}>
      </div>
    </div>
  );
};

export default GetSalons;
