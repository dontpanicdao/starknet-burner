import styles from "styles/CloseButton.module.css";
import { notify } from "../lib/shared/message";

const CloseButton = () => {
  const close = () => {
    notify({ type: "keyring_CloseModalRequested", key: "close" });
  };

  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={close}
      className={styles.closeButton}
    >
      <path
        d="M21.0001 22.2375L26.5063 27.7439L27.7437 26.5064L22.2375 21.0001L27.7437 15.4938L26.5063 14.2563L21.0001 19.7626L15.4938 14.2563L14.2563 15.4938L19.7627 21.0001L14.2563 26.5064L15.4938 27.7439L21.0001 22.2375Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 35C28.732 35 35 28.732 35 21C35 13.268 28.732 7 21 7C13.268 7 7 13.268 7 21C7 28.732 13.268 35 21 35ZM21 36.75C29.6986 36.75 36.75 29.6986 36.75 21C36.75 12.3015 29.6986 5.25 21 5.25C12.3015 5.25 5.25 12.3015 5.25 21C5.25 29.6986 12.3015 36.75 21 36.75Z"
        fill="white"
      />
    </svg>
  );
};

export default CloseButton;
