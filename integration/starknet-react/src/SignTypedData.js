import { useSignTypedData } from "@starknet-react/core";
// import { TypedData } from 'starknet/utils/typedData'

const typedData = {
  domain: {
    chainId: "SN_GOERLI",
    name: "burner.starknet",
    version: "0.4",
  },
  message: {
    expires: 1662783445,
    session_key: "0x0001",
  },
  primaryType: "Session",
  types: {
    Session: [
      {
        name: "session_key",
        type: "felt",
      },
      {
        name: "expires",
        type: "felt",
      },
    ],
    StarkNetDomain: [
      {
        name: "name",
        type: "felt",
      },
      {
        name: "version",
        type: "felt",
      },
      {
        name: "chainId",
        type: "felt",
      },
    ],
  },
};

const SignTypedData = () => {
  const { data, signTypedData } = useSignTypedData(typedData);

  return (
    <div>
      <h2>useSignTypedData</h2>
      <button
        onClick={async () => {
          await signTypedData();
        }}
      >
        Sign
      </button>
      <pre>{data ? JSON.stringify(data) : ""}</pre>
    </div>
  );
};

export default SignTypedData;
