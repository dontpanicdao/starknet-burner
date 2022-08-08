import { useEffect } from "react";
import { burner } from "@blaqkube/scratch";

const Burner = () => {
  useEffect(() => {
    if (window) {
      burner();
    }
  }, []);

  return <div className="card" id="starknetburner" />;
};

export default Burner;
