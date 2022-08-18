import { useEffect } from "react";
import { keyManager } from "@starknet/burner";

const KeyManager = () => {
  useEffect(() => {
    if (window) {
      keyManager();
    }
  }, []);
  return <div id="starknetburner"></div>;
};

export default KeyManager;
