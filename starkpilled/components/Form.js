import { useStarknet, useStarknetInvoke } from "@starknet-react/core";
import useTokenContract from "../lib/useTokenContract";
import { toBN } from "starknet/dist/utils/number";
import styles from "../styles/Form.module.css";
import { useState } from "react";

const Form = () => {
  const { account } = useStarknet();
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

  const { contract: transferContract } = useTokenContract();
  const { invoke: tokenTransferInvoke } = useStarknetInvoke({
    contract: transferContract,
    method: "transfer",
  });
  const parsedValue = {
    low: toBN(formData.amount),
    high: toBN(0),
  };

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
        <div
          className={styles.button}
          value="Send Pills"
          onClick={() => {
            tokenTransferInvoke({
              args: [formData.address, parsedValue],
              metadata: {
                method: "Transfer",
                message: "Transfer Starkpills to another address",
              },
            });
          }}
        >
          Send
        </div>
        <div className={styles.button} onClick={() => handleClick("faucet")}>
          Faucet
        </div>
      </div>
    </form>
  );
};

export default Form;
