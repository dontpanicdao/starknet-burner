import { useStarknetBlock } from "@starknet-react/core";

const Block = () => {
  const { data, loading, error } = useStarknetBlock();

  return (
    <div>
      <h2>useStarknetBlock</h2>
      <br />
      <pre>
        {loading || error ? "loading..." : JSON.stringify(data, null, " ")}
      </pre>
    </div>
  );
};

export default Block;
