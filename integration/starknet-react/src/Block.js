import { useStarknetBlock } from "@starknet-react/core";

const Block = () => {
  const { data, loading, error } = useStarknetBlock();

  return (
    <div>
      <h2>useStarknetBlock</h2>
      <br />
      {loading || error ? "loading..." : data?.block_hash}
    </div>
  );
};

export default Block;
