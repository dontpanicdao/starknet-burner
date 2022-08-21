import styles from "../styles/Modal.module.css";
import { useEffect } from "react";

const Modal = ({ modalMessage, setModalMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setModalMessage({ level: 0, text: "" });
    }, 3000);
    return () => clearTimeout(timer);
  });

  return modalMessage.level !== 0 ? (
    <div className={modalMessage.level === 1 ? styles.modal : styles.red}>
      {modalMessage.text}
      <span
        className={styles.modalCross}
        onClick={() => setModalMessage({ level: 0, text: "" })}
      >
        X
      </span>
    </div>
  ) : (
    <div />
  );
};

export default Modal;
