import styles from "./header.module.css";
import logo from "../../../../Resources/img/mainLogoNoBG.png";

const Header = () => {
  return (
    <>
      <header className={styles.headerContainer}>
        <img src={logo} alt="divirta" />
      </header>
    </>
  );
};

export default Header;
