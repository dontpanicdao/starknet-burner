import styles from "styles/CloseButton.module.css";
import { notify } from "../lib/handlers";

const CloseButton = () => {
  const close = () => {
    notify({ type: "keyring_CloseModalRequested" });
  };

  return (
    <div className={styles.round_container} onClick={close}>
      <div className={styles.round_content}>X</div>
    </div>
  );
};

export default CloseButton;
