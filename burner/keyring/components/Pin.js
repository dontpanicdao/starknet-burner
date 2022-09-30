import styles from "styles/Pin.module.css";

export default ({ pin }) => {
  return (
    <div className={styles.choicesContainer}>
      <div className={styles.choice}>
        {pin
          .toString()
          .split("")
          .map((num, i) => (
            <span className={styles.number} key={i}>
              {num}
            </span>
          ))}
      </div>
    </div>
  );
};
