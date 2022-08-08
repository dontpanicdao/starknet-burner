import styles from "../styles/Modal.module.css";
import { useEffect } from "react";

const Modal = ({ isModal, setIsModal }) => {
  console.log("isModal :", isModal);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModal(!isModal);
    }, 3000);
    return () => clearTimeout(timer);
  });

  return isModal ? (
    <div className={styles.modal}>
      Transaction success !
      <span className={styles.modalCross} onClick={() => setIsModal(!isModal)}>
        X
      </span>
    </div>
  ) : (
    <div>No Modal</div>
  );
};

export default Modal;
