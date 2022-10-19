import { useState } from "react";

export const useCall = (account, contractAddress, entrypoint, calldata) => {
  const [output, setOutput] = useState([]);
  const call = async () => {
    if (!account || !contractAddress || !entrypoint) {
      console.log("could not call contract");
      return;
    }
    if (!calldata) {
      calldata = [];
    }
    const result = await account.callContract({
      contractAddress,
      entrypoint,
      calldata,
    });
    if (!result.result || result.result.length === 0) {
      throw new Error("error with get_count");
    }
    setOutput(result.result);
  };
  return [output, call];
};

export default useCall;
