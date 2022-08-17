import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styles from "./layout.module.css";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Header></Header>
      <div className={styles.content}>
        {props.children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
