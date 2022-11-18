import styles from "./fullImage.module.css";

const FullImage = ({ fullImage, isClicked, handleClose }) => {
  return (
    isClicked && (
      <div className={styles.fullImageContainer}>
        <div className={styles.fullImageButton}>
          <img src={fullImage} />
          <button onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    )
  );
};

export default FullImage;
