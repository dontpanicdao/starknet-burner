import styles from "styles/Loader.module.css";

const Loader = ({ message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
      <h3>Loading</h3>
      <p>{message}</p>
    </div>
  );
};

export default Loader;
