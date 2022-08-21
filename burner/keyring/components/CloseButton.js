import styles from "styles/CloseButton.module.css";
import Image from "next/image";
import { notify } from "../lib/handlers";

const CloseButton = () => {
  const close = () => {
    notify({ type: "keyring_CloseModalRequested" });
  };

  return (
    <button className={styles.closeButton} onClick={close}>
      <Image src="/close.svg" width={16} height={16} />
    </button>
  );
};

export default CloseButton;
