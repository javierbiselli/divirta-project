import React from "react";
import styles from "./modal.module.css";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ children, isOpen, handleClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={handleClose}
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
            onClick={isOpen}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
