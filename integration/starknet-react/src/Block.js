import { useStarknetBlock } from "@starknet-react/core";

const Block = () => {
  const { data, loading, error } = useStarknetBlock();

  return (
    <div>
      <br />
      {loading || error ? "loading..." : data?.block_hash}
    </div>
  );
};

export default Block;
