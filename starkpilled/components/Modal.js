import styles from "../styles/Modal.module.css";

const Modal = ({ isModal, setIsModal }) => {
  console.log("isModal :", isModal);

  return isModal ? (
    <div className={styles.modal}>
      Transaction succès !{" "}
      <span className={styles.modalCross} onClick={() => setIsModal(!isModal)}>
        X
      </span>
    </div>
  ) : (
    <div>No Modal</div>
  );
};

export default Modal;
