import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { useMemo } from "react";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import useTokenContract from "../lib/useTokenContract";

const UserBalance = () => {
  const { account } = useStarknet();
  const { contract } = useTokenContract();

  const { data, loading, error } = useStarknetCall({
    contract,
    method: "balanceOf",
    args: account ? [account] : undefined,
  });

  const content = useMemo(() => {
    if (!account) {
      return <></>;
    }
    if (loading) {
      return <div>Loading balance</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }
    if (data?.length > 0) {
      const balance = uint256ToBN(data[0]);
      return <span>Balance : {balance.toString(10)} STARKPILLS</span>;
    }
  }, [account, data, loading, error]);

  return content;
};

export default UserBalance;
