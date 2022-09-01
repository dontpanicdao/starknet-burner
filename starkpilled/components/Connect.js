import styles from "../styles/Connect.module.css";
import { useEffect } from "react";
import { keyManager } from "@starknet/burner";
import Image from "next/image";

const Connect = () => {
  useEffect(() => {
    if (window) {
      keyManager();
    }
  }, []);

  const click = () => {
    if (window && window["starknet-burner"]) {
      const burner = window["starknet-burner"];
      burner.enable({ showModal: true });
    }
  };

  return (
    <>
      <div id="starknetburner" />
      <button className={styles.button} onClick={click}>
        Connect
        <Image src="/connect.svg" width={16} height={16} alt="connect" />
      </button>
    </>
  );
};

export default Connect;
