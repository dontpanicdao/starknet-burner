import styles from "../styles/Form.module.css";

const Form = () => {
  return (
    <form className={styles.form}>
      <h2 className={styles.formTitle}>SEND SOME STARKPILLS</h2>

      <input
        className={styles.input}
        type="text"
        name="to"
        placeholder="Address to transfer"
      />

      <input
        className={styles.input}
        type="number"
        name="amount"
        min="1"
        max="10"
        placeholder="Amount (1-10)"
      />

      <input className={styles.send} type="submit" value="Send Pills" />
    </form>
  );
};

export default Form;
