import { useState } from "react";
import styles from "./imageSlider.module.css";
import { AnimatePresence, motion } from "framer-motion";
import FullImage from "./FullImage/FullImage";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const imgs = `${slides[(currentIndex + 1) % slides.length]}`;
  const [direction, setDirection] = useState(0);

  const variants = {
    initial: (direction) => {
      return {
        x: direction > 0 ? -300 : 300,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: "ease-in",
    },
    exit: (direction) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        transition: "ease-in",
      };
    },
  };

  const goToNextSlide = () => {
    setDirection(-1);
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const goToPreviousSlide = () => {
    setDirection(1);
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  const onClick = () => {
    setIsClicked(true);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderShow}>
        <button
          onClick={goToPreviousSlide}
          className={
            currentIndex == 0 ? styles.leftArrowNone : styles.leftArrow
          }
        >
          <i className="fa-solid fa-circle-left"></i>
        </button>
        <img src={imgs} className={styles.preLoader} />
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            onClick={onClick}
            src={slides[currentIndex]}
            alt="slides"
            variants={variants}
            animate="animate"
            initial="initial"
            exit="exit"
            custom={direction}
            className={styles.slider}
            key={slides[currentIndex]}
          />
        </AnimatePresence>
        <button
          onClick={goToNextSlide}
          className={
            currentIndex === slides.length - 1
              ? styles.rightArrowNone
              : styles.rightArrow
          }
        >
          <i className="fa-solid fa-circle-right"></i>
        </button>
        <div className={styles.countPictures}>{`${currentIndex + 1}/${
          slides.length
        }`}</div>
      </div>
      <FullImage
        isClicked={isClicked}
        handleClose={() => setIsClicked(false)}
        fullImage={slides[currentIndex]}
      />
    </div>
  );
};

export default ImageSlider;
