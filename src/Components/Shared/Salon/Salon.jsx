import React from "react";
import styles from './salon.module.css';
import { Link } from "react-router-dom";

const Salon = (props) => {
  return (
    <section>
      <h3>{props.name}</h3>
      <div><img className={styles.img} src={props.img}></img></div>
      <div className={styles.rateAndInfo}>
        <h4>Puntuacion: {props.rate}</h4>
        <Link to={`/moreinfo/${props.salonId}`}>MAS INFO</Link>
      </div>
      <div>{props.address}</div>
      <h4>Telefono: {props.tel}</h4>
      <div>{props.description}</div>
      <div className={styles.commentContainer}>
        Comentario destacado: {props.topComment}
      </div>
    </section>
    );
};

export default Salon;