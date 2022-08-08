import styles from "../styles/Form.module.css";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Modal from "./Modal";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    amount: 0,
  });

  useEffect(() => {
    if (isModal === false)
      setFormData({
        address: "",
        amount: "",
      });
  }, [isModal]);

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
    setIsLoading(true);
    console.log(`executing ${metadata?.method}, message: ${metadata?.message}`);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsModal(!isModal);
    }, 10000);
    return () => clearTimeout(timer);
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
        {!isLoading ? (
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
        ) : (
          <Loader />
        )}

        <div className={styles.button} onClick={faucet}>
          Faucet
        </div>
      </div>
      {isModal && <Modal isModal={isModal} setIsModal={setIsModal} />}
    </form>
  );
};

export default Form;
