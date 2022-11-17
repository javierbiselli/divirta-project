import React from "react";
import styles from "./buttonLoader.module.css";

const ButtonLoader = ({ loading }) => {
  return loading ? (
    <div className={styles.shade}>
      <span className={styles.buttonLoader}></span>
    </div>
  ) : (
    ""
  );
};

export default ButtonLoader;
