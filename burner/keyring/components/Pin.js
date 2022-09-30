import styles from "styles/Pin.module.css";

export default ({ accessKey, isLoading, sessionToken }) => {
  return (
    <div className={styles.choicesContainer}>
      <div className={styles.choice}>
        <span className={styles.number}>1</span>
        <span className={styles.number}>2</span>
        <span className={styles.number}>3</span>
        <span className={styles.number}>4</span>
        <span className={styles.number}>5</span>
        <span className={styles.number}>6</span>
      </div>
    </div>
  );
};
