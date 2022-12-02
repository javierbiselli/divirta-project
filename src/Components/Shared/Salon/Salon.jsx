import styles from "./salon.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import ImageSlider from "../ImageSlider/ImageSlider";
import { Link } from "react-router-dom";

const Salon = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [children, setChildren] = useState("");
  const [closeButton, setCloseButton] = useState("Cerrar");

  const imageList = props.img.map((images) => images);

  const calculateProm = () => {
    let sum = 0;
    for (let n of props.ratings) {
      sum += n;
    }
    sum = sum / props.ratings.length;
    return sum;
  };

  const setContent = () => {
    setCloseButton("Cerrar");
    window.localStorage.setItem("review", props.id);
    setChildren(
      <section
        className={styles.sectionModal}
        onClick={() => setOpenModal(true)}
      >
        <h3>{props.name}</h3>
        <ImageSlider slides={imageList} />
        <div className={styles.reviewPageLink}>
          <Link to={`/salons/${props.id}`}>Lo visitaste? dejale tu review</Link>
        </div>
        <div className={styles.rateAndInfo}>
          <h4>
            Puntuacion: {props.ratings[0] ? calculateProm() : "sin puntuacion"}
          </h4>
        </div>
        <div className={styles.info}>
          <b>Telefono: {props.tel}</b>
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
        <div className={styles.contractButtonContainer}>
          <Link to={`contract/${props.id}`}>
            <button className={styles.contractButton}>Contratar salon</button>
          </Link>
        </div>
        <div className={styles.commentsContainer}>
          <b>Comentarios:</b>
          {props.comments[0] ? (
            props.comments.map((comments) => {
              return (
                <div
                  key={comments[0]}
                  className={styles.singleCommentContainer}
                >
                  <div className={styles.commentOwner}>{comments[0]}</div>
                  <div className={styles.commentContent}>{comments[1]}</div>
                  <div className={styles.commentRate}>
                    Puntaje: {comments[2]}
                  </div>
                </div>
              );
            })
          ) : (
            <div>Este salon aun no tiene comentarios</div>
          )}
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
          <h4>
            Puntuacion:{" "}
            <span>{props.ratings[0] ? calculateProm() : "sin puntuacion"}</span>
          </h4>
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
          Comentario destacado:
          <div className={styles.topComment}>
            {props.topComment ? (
              <div>{props.topComment}</div>
            ) : (
              <div>Este salon aun no tiene comentarios</div>
            )}
          </div>
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
