import styles from "../styles/Form.module.css";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    address: "",
    amount: 0,
  });

  const cancel = () => {
    setFormData({
      address: "",
      amount: 0,
    });
  };

  const faucet = () => {
    setFormData({
      address: `0x05a87f6bec0b6121e55f291f8e06e6149accd706fb43c725a7f1fd3f3f62aadf`,
      amount: 1,
    });
  };

  const send = ({ args, metadata }) => {
    if (args.address === "" || args.amount <= 1) {
      return console.log("invalid address or amount");
    }
    console.log(`executing ${metadata?.method}, message: ${metadata?.message}`);
  };

  return (
    <form className={styles.form}>
      <h2 className={styles.formTitle}>Send Starkpills</h2>

      <input
        className={styles.input}
        type="text"
        name="to"
        placeholder="Address to transfer"
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        value={formData.address}
      />

      <input
        className={styles.input}
        type="number"
        name="amount"
        min="1"
        max="10"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        placeholder="Amount (1-10)"
      />

      <div className={styles.buttonsContainer}>
        <div className={styles.button} onClick={cancel}>
          Cancel
        </div>
        <div
          className={styles.button}
          value="Send Pills"
          onClick={() => {
            send({
              args: [formData.address, formData.amount],
              metadata: {
                method: "Transfer",
                message: "Sending Starkpills...",
              },
            });
          }}
        >
          Send
        </div>
        <div className={styles.button} onClick={faucet}>
          Faucet
        </div>
      </div>
    </form>
  );
};

export default Form;
