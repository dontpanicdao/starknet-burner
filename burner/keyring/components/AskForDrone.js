import styles from "styles/AskForDrone.module.css";
import QRCode from "components/QRCode";
import Pin from "components/Pin";

function Validator({ accessKey, modalProperties }) {
  if (modalProperties.usePin) {
    return <Pin accessKey={accessKey} modalProperties={modalProperties} />;
  }
  return (
    <QRCode
      value={`${
        process.env.NEXT_PUBLIC_DRONE_BASE_URL || "https://app.qasar.xyz"
      }/?s=${accessKey}`}
    />
  );
}

export const AskForDrone = ({
  accessKey,
  isLoading,
  sessionToken,
  modalProperties,
}) => {
  return (
    <div className={styles.choicesContainer}>
      <div className={styles.choice}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`${
            process.env.NEXT_PUBLIC_DRONE_BASE_URL ||
            "https://drone.blaqkube.io"
          }?s=${accessKey}`}
        >
          <Validator accessKey={accessKey} modalProperties={modalProperties} />
        </a>
      </div>
      <div className={styles.choice}>
        {!isLoading && !sessionToken && "Wait for authorization"}
        {isLoading && "Loading..."}
        {!isLoading && sessionToken && "Loaded!"}
      </div>
    </div>
  );
};

export default AskForDrone;
