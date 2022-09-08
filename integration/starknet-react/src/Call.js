import { useStarknetCall, useContract } from "@starknet-react/core";
import { hex2ascii } from "./lib/convert";
import mapsABI from "./abi/frensMaps.json";
import { uint256ToBN } from "starknet/utils/uint256";

const Call = () => {
  const useMapsContract = () => {
    return useContract({
      abi: mapsABI,
      address:
        "0x052c936c5624517d671a6378ab0ede31e4c6d4584357ebb432bb1313af93599c",
    });
  };

  const { contract: maps } = useMapsContract();
  const owner =
    "0x0066a69B58C8ffF69a48C4D1284431a56B0e95bdD97CD846e4093F2E1f0a12E4";
  const watch = true;

  const { data: symbol } = useStarknetCall({
    contract: maps,
    method: "symbol",
    args: [],
    options: { watch },
  });

  const { data: balance } = useStarknetCall({
    contract: maps,
    method: "balanceOf",
    args: [owner],
    options: { watch },
  });

  return (
    <>
      <h2>useStarknetCall (and useContract)</h2>
      <div>
        <pre>
          Symbol:
          {symbol?.length !== 1 ? "" : hex2ascii(`0x${symbol[0].toString(16)}`)}
        </pre>

        <pre>
          Quantity:
          {balance?.length !== 1 ? "" : uint256ToBN(balance[0]).toString(10)}
        </pre>
      </div>
    </>
  );
};

export default Call;
