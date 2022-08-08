import { useEffect } from "react";
import { setupCounter } from "xxx-ts";

const Burner = () => {
  useEffect(() => {
    if (window) {
      const element = document.querySelector("#counter");
      setupCounter(element);
    }
  }, []);

  return (
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  );
};

export default Burner;
