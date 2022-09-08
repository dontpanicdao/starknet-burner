import { useStarknetTransactionManager } from "@starknet-react/core";
import { useState } from "react";

const defaultTransaction = {
  transactionHash:
    "0x4253da311b9e157b9b2b95d52d7dbba565b0634bae615932df4136e6d8ae3b7",
};

const TransactionManager = () => {
  const { transactions, addTransaction, removeTransaction } =
    useStarknetTransactionManager();

  const [TX, setTX] = useState(defaultTransaction);

  const monitor = () => {
    reset();
    addTransaction({
      status: "TRANSACTION_RECEIVED",
      transactionHash: TX.transactionHash,
      metadata: { show: true },
    });
  };

  const reset = () => {
    setTX(defaultTransaction);
    for (let i = 0; i < transactions.length; i++) {
      console.log(transactions[i].transactionHash);
      removeTransaction(transactions[i].transactionHash);
    }
  };

  const handleTXChange = (e) => {
    setTX({
      transactionHash: e.target.value,
    });
  };

  const listTransactions = (transaction, idx) => (
    <div key={idx}>
      <a
        href={`https://goerli.voyager.online/tx/${transaction.transactionHash}`}
      >
        {transaction.transactionHash?.slice(0, 8)}...
        {transaction.transactionHash?.slice(-4)}({idx})
      </a>
      <div>{transaction?.status}</div>
      <pre>{JSON.stringify(transaction.transaction, null, " ")}</pre>
    </div>
  );

  return (
    <>
      <h2>useStarknetTransactionManager (manual)</h2>
      <input type="text" value={TX.transactionHash} onChange={handleTXChange} />
      <button onClick={monitor}>monitor</button>
      <button onClick={reset}>reset</button>
      {transactions.map(listTransactions)}
      <div>count: {transactions.length}</div>
    </>
  );
};

export default TransactionManager;
