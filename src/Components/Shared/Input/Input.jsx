import React from "react";
import styles from "./input.module.css";

const Input = ({ type, name, placeholder, register, error }) => {
  return (
    <>
      <div className={styles.container}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          {...register(name)}
          className={error ? styles.errorRed : styles.input}
        ></input>
        {/* {error && <p className={styles.error}>X</p>} */}
      </div>
    </>
  );
};

export default Input;
