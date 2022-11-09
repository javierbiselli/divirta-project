import styles from "./salon.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import ImageSlider from "../ImageSlider/ImageSlider";

const Salon = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [children, setChildren] = useState("");
  const [closeButton, setCloseButton] = useState("Cerrar");

  const imageList = props.img.map((images) => images);

  const setContent = () => {
    setCloseButton("Cerrar");
    setChildren(
      <section
        className={styles.sectionModal}
        onClick={() => setOpenModal(true)}
      >
        <h3>{props.name}</h3>
        <ImageSlider slides={imageList} />
        <div className={styles.rateAndInfo}>
          <h4>Puntuacion: {props.rate}</h4>
        </div>
        <div className={styles.info}>
          <b>Telefono:</b> {props.tel}
        </div>
        <div className={styles.info}>
          <b>Descripcion:</b> {props.description}
        </div>
        <div className={styles.info}>
          <b>Direccion</b>: {props.address}
        </div>
        <div className={styles.info}>
          <b>Email</b>: {props.email}
        </div>
        <div className={styles.info}>
          <b>Redes sociales:</b>
          <div>Facebook: {props.facebook}</div>
          <div>Instagram: {props.instagram}</div>
          <div>Whatsapp: {props.whatsapp}</div>
        </div>
        <div className={styles.info}>
          <b>Dueño</b>: {props.owner}
        </div>
        <div className={styles.commentContainer}>
          Comentarios: {props.topComment}
        </div>
      </section>
    );
  };

  return (
    <>
      <section className={styles.salonSection}>
        <h3>{props.name}</h3>
        <div>
          <img className={styles.img} src={props.img}></img>
        </div>
        <div className={styles.rateAndInfo}>
          <h4>Puntuacion: {props.rate}</h4>
          <a
            className={styles.moreInfoButton}
            onClick={() => {
              setOpenModal(true);
              setContent();
            }}
          >
            MAS INFO
          </a>
        </div>
        <h4>Telefono: {props.tel}</h4>
        <div className={styles.commentContainer}>
          Comentario destacado: {props.topComment}
        </div>
      </section>
      <Modal
        isOpen={openModal}
        closeButton={closeButton}
        handleClose={() => setOpenModal(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default Salon;
