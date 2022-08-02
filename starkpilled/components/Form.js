import styles from "../styles/Form.module.css";

const Form = () => {
  return (
    <form className={styles.form}>
      <label>
        Nom :
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default Form;
