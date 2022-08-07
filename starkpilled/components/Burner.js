import { useEffect } from "react";
import { wallet } from "@blaqkube/scratch";

const Burner = () => {
  useEffect(() => {
    if (window) {
      wallet();
    }
  }, []);

  return <div id="starknetburner"></div>;
};

export default Burner;
