import React from "react";
import styles from "./modal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import ButtonLoader from "../Loader/ButtonLoader";

const Modal = ({
  children,
  isOpen,
  handleClose,
  closeButton,
  loading,
  // okButton,
  // okButtonText,
  // onClick,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.2,
              delay: 0.2,
            },
          }}
          className={styles.shade}
        >
          <motion.div
            initial={{
              y: 800,
            }}
            animate={{
              y: 0,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              y: 800,
              transition: {
                duration: 0.3,
                delay: 0.2,
              },
            }}
            className={styles.billboard}
          >
            <motion.div
              initial={{
                x: 800,
              }}
              animate={{
                x: 0,
                transition: {
                  duration: 0.3,
                  delay: 0.1,
                },
              }}
              exit={{
                x: 800,
                transition: {
                  duration: 0.2,
                },
              }}
              className={styles.content}
            >
              {children}
            </motion.div>
            <div>
              {/* <button
                onClick={onClick}
                className={okButton ? styles.okButtonYes : styles.okButtonNot}
              >
                {okButtonText}
              </button> */}
              <button onClick={handleClose} className={styles.closeButton}>
                {closeButton}
              </button>
            </div>
          </motion.div>
          <ButtonLoader loading={loading} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
