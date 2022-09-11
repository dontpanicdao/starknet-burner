import styles from "styles/AskForDrone.module.css";
import QRCode from "components/QRCode";

const AskForDrone = ({ accessKey, isLoading, sessionToken }) => {
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
          <QRCode
            value={`${
              process.env.NEXT_PUBLIC_DRONE_BASE_URL ||
              "https://drone.blaqkube.io"
            }/?s=${accessKey}`}
          />
        </a>
      </div>
      <div className={styles.choice}>
        {!isLoading && !sessionToken && "Wait for signature!"}
        {isLoading && "Loading..."}
        {!isLoading && sessionToken && "Loaded!"}
      </div>
    </div>
  );
};

export default AskForDrone;
