import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import Form from "../components/Form";
import UserBalance from "../components/userBalance";
import { useConnectors } from "@starknet-react/core";

export default function Home() {
  const Wallet = dynamic(() => import("../components/Wallet"), {
    ssr: false,
  });

  const [network, setNetwork] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setNetwork(window.starknet.chainId), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.starknet) {
      window.starknet.on("accountsChanged", () => {
        setNetwork(window.starknet.chainId);
      });
      window.starknet.on("networkChanged", () => {
        setNetwork(window.starknet.chainId);
      });
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Starkpilled - Why not starkpill your fren?</title>
        <meta name="description" content="Starkpill your fren!" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Ready to Starkpill?</h1>
        <p>{network === "SN_GOERLI" ? "Goerli network" : "Mainnet"}</p>
        <div className={styles.walletContainer}>
          <Wallet />
          <UserBalance />
        </div>
        <Form />
      </main>
    </div>
  );
}
