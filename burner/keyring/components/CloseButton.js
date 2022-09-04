import styles from "styles/CloseButton.module.css";
import { notify } from "../lib/shared/message";

const CloseButton = () => {
  const close = () => {
    notify({ type: "keyring_CloseModalRequested", key: "close" });
  };

  return (
    <div className={styles.round_container} onClick={close}>
      <div className={styles.round_content}>X</div>
    </div>
  );
};

export default CloseButton;
