import Header from "./Header/Header";
// import Footer from "./Footer/Footer";
import styles from "./layout.module.css";
import NavBar from "./NavBar/NavBar";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.contentNavBarContainer}>
        <NavBar />
        <div className={styles.content}>{props.children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
