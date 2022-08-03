import { useStarknet, useStarknetInvoke } from "@starknet-react/core";
import { useCallback } from "react";
import styles from "../styles/Form.module.css";
import { useState } from "react";
import useTokenContract from "../lib/useTokenContract";

const Form = () => {
  const { contract } = useTokenContract();
  const { account } = useStarknet();
  const { loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: "transfer",
  });

  const [formData, setFormData] = useState({
    address: "",
    amount: "",
  });

  const handleClick = (type) => {
    if (type === "cancel") {
      setFormData({
        address: "",
        amount: 0,
      });
    }
    if (type === "faucet") {
      setFormData({
        address: account || "Please connect to get Faucet address",
        amount: 0,
      });
    }
  };
  const onTransfer = useCallback(() => {
    reset();
    if (account) {
      invoke({
        args: [formData.address, [formData.amount, 0]],
        metadata: { method: "transfer" },
      });
    }
  }, [account, invoke, reset]);

  return (
    <form className={styles.form}>
      <h2 className={styles.formTitle}>SEND SOME STARKPILLS</h2>

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
        <div className={styles.button} onClick={() => handleClick("cancel")}>
          Cancel
        </div>
        <input
          className={styles.button}
          value="Send Pills"
          onClick={onTransfer}
        />
        <div className={styles.button} onClick={() => handleClick("faucet")}>
          Faucet
        </div>
      </div>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default Form;
