import { useStarknetTransactionManager } from "@starknet-react/core";
import { useStarknet, useStarknetInvoke } from "@starknet-react/core";
import { useContract } from "@starknet-react/core";

import CounterAbi from "./abi/counter.json";

const TransactionItem = ({ transaction }) => {
  return (
    <span>
      <a
        href={`https://goerli.voyager.online/tx/${transaction.transactionHash}`}
      >
        {transaction.metadata.method}: {transaction.metadata.message} -{" "}
        {transaction.status}
      </a>
    </span>
  );
};

const TransactionList = () => {
  const { transactions } = useStarknetTransactionManager();
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>
          <TransactionItem transaction={transaction} />
        </li>
      ))}
    </ul>
  );
};

const Invoke = () => {
  const { account } = useStarknet();
  const { contract: counter } = useContract({
    abi: CounterAbi,
    address:
      "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1",
  });
  const { invoke } = useStarknetInvoke({
    contract: counter,
    method: "incrementCounter",
  });

  if (!account) {
    return null;
  }

  return (
    <div>
      <h2>useStarknetInvoke (and useStarknetTransactionManager)</h2>
      <button
        onClick={() =>
          invoke({
            args: ["0x1"],
            metadata: {
              method: "incrementCounter",
              message: "increment counter by 1",
            },
          })
        }
      >
        Increment Counter by 1
      </button>
      <TransactionList />
    </div>
  );
};

export default Invoke;
