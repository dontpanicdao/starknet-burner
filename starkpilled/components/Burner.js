import { useEffect } from "react";
import { BurnerWallet } from "@blaqkube/scratch";

const Burner = () => {
  useEffect(() => {
    BurnerWallet();
  }, []);

  return <div id="starknetburner"></div>;
};

export default Burner;
