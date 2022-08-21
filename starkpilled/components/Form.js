import styles from "../styles/Form.module.css";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Modal from "./Modal";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState({ level: 0, text: "" });

  const [formData, setFormData] = useState({
    address: "",
    amount: 0,
  });

  useEffect(() => {
    if (!modalMessage?.text || !modalMessage.text.length === 0) {
      setFormData({
        address: "",
        amount: 0,
      });
    }
  }, [modalMessage]);

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

  const operate = async (starknet) => {
    const nonce = await starknet.account.getNonce();
    return nonce;
  };

  const send = async ({ address, amount }) => {
    if (address === "" || amount < 1) {
      setIsLoading(false);
      setModalMessage({ level: 2, text: "Set the address and amount" });
      return;
    }
    const starknet = window["starknet-burner"];
    if (!starknet || !starknet?.isConnected || !starknet?.account) {
      setIsLoading(false);
      setModalMessage({ level: 2, text: "No StarkNet connection" });
      return;
    }
    setIsLoading(true);
    try {
      const nonce = await operate(starknet);
      setIsLoading(false);
      setModalMessage({ level: 1, text: `the nonce is ${nonce}` });
      return;
    } catch (e) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setModalMessage({ level: 1, text: "Transaction succeeded!" });
      }, 5000);
      return () => clearTimeout(timer);
    }
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
        min="0"
        max="10"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        placeholder="Amount (1-10)"
      />

      <div className={styles.buttonsContainer}>
        {!isLoading ? (
          <>
            <div className={styles.button} onClick={cancel}>
              Cancel
            </div>
            <div
              className={styles.button}
              value="Send Pills"
              onClick={() => {
                send({ ...formData });
              }}
            >
              Send
            </div>
            <div className={styles.button} onClick={faucet}>
              Faucet
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
      {modalMessage.level === 0 || (
        <Modal modalMessage={modalMessage} setModalMessage={setModalMessage} />
      )}
    </form>
  );
};

export default Form;
