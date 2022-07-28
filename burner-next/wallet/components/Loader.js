import styles from "styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
      <h3>Loading...</h3>
    </div>
  );
};

export default Loader;
