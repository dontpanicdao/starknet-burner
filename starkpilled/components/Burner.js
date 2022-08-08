import { useEffect } from "react";
import { wallet } from "@starknet/burner";

const Burner = () => {
  useEffect(() => {
    if (window) {
      wallet();
    }
  }, []);
  return <div id="starknetburner"></div>;
};

export default Burner;
