import { useStarknetTransactionManager } from "@starknet-react/core";
import { useStarknet, useStarknetExecute } from "@starknet-react/core";

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

const Execute = () => {
  const { account } = useStarknet();

  const { execute } = useStarknetExecute({
    calls: [
      {
        contractAddress:
          "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1",
        entrypoint: "incrementCounter",
        calldata: ["0x1"],
      },
    ],
    metadata: {
      method: "incrementCounter",
      message: "increment counter by 1",
    },
  });

  if (!account) {
    return null;
  }

  return (
    <div>
      <h2>useStarknetExecute (and useStarknetTransactionManager)</h2>
      <button
        onClick={async () => {
          await execute();
        }}
      >
        Increment Counter by 1
      </button>
      <TransactionList />
    </div>
  );
};

export default Execute;
