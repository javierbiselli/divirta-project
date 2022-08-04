import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <h3>Seguinos en insta!</h3>
      <span>
        <i className="fa-solid fa-arrow-right"></i>
      </span>
      <button>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-square-instagram"></i>
        </a>
      </button>
    </footer>
  );
};

export default Footer;
