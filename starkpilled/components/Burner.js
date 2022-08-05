import { useEffect } from "react";
import { BurnerWallet } from "@blaqkube/scratch";

const Burner = () => {
  useEffect(() => {
    if (window) {
      BurnerWallet();
    }
  }, []);

  return <div id="starknetburner"></div>;
};

export default Burner;
