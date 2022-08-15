import React from "react";
import styles from './salon.module.css';
import { Link } from "react-router-dom";

const Salon = (props) => {
  return (
    <section>
      <h3>{props.name}</h3>
      <div className={styles.img}>{props.img}</div>
      <div className={styles.rateAndInfo}>
        <h4>Puntuacion: {props.rate}</h4>
        <Link to='/moreinfo'>MAS INFO</Link>
      </div>
      <h4>Telefono: {props.tel}</h4>
      <div className={styles.commentContainer}>
        Comentario destacado: {props.topComment}
      </div>
    </section>
    );
};

export default Salon;