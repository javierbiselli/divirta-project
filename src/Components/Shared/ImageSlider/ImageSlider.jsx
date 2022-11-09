import { useState } from "react";
import styles from "./imageSlider.module.css";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imgs = `${slides[(currentIndex + 1) % slides.length]}`;

  const goToPreviousSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? "" : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? "" : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={styles.sliderContainer}>
      <button
        onClick={goToPreviousSlide}
        className={currentIndex == 0 ? styles.leftArrowNone : styles.leftArrow}
      >
        {"<"}
      </button>
      <img src={imgs} className={styles.preLoader} />
      <div
        className={styles.slider}
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
      ></div>
      <button
        onClick={goToNextSlide}
        className={
          currentIndex === slides.length - 1
            ? styles.rightArrowNone
            : styles.rightArrow
        }
      >
        {">"}
      </button>
    </div>
  );
};

export default ImageSlider;
