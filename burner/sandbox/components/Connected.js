import styles from "styles/Connected.module.css";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const Connected = ({ sessionToken }) => {
  return (
    <div className={styles.sessionContent}>
      <Jazzicon
        diameter={16}
        seed={jsNumberForAddress(sessionToken?.account)}
      />
      <p onClick={() => navigator.clipboard.writeText(sessionToken?.account)}>
        {sessionToken?.account.slice(0, 5) +
          "..." +
          sessionToken?.account.slice(-4)}
      </p>
    </div>
  );
};

export default Connected;
