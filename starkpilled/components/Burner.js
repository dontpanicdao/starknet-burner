import { useEffect } from "react";
import { burner } from "xxx-ts";

const Burner = () => {
  useEffect(() => {
    if (window) {
      burner();
    }
  }, []);

  return <div className="card" id="starknetburner" />;
};

export default Burner;
