import { useConnectors } from "@starknet-react/core";

const Connect = () => {
  const { connect, connectors } = useConnectors();
  return (
    <div>
      {connectors.map((connector) =>
        connector.available() ? (
          <button key={connector.id()} onClick={() => connect(connector)}>
            Connect {connector.name()}
          </button>
        ) : null
      )}
    </div>
  );
};

export default Connect
