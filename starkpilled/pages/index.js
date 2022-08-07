import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import Form from "../components/Form";
import UserBalance from "../components/userBalance";
import Burner from "../components/Burner";
import { version } from "../lib/version";

export default function Home() {
  const Wallet = dynamic(() => import("../components/Wallet"), {
    ssr: false,
  });

  const [network, setNetwork] = useState("");

  useEffect(() => {
    if (window?.starknet) {
      const timer = setTimeout(() => setNetwork(window.starknet.chainId), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (window?.starknet) {
      window.starknet.on("accountsChanged", () => {
        setNetwork(window?.starknet?.chainId);
      });
      window.starknet.on("networkChanged", () => {
        setNetwork(window?.starknet?.chainId);
      });
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Starkpilled</title>
        <meta name="description" content="Fren, you've been Starkpilled!" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#90cdf4" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Ready to Starkpill?</h1>
        <p>
          {network !== "SN_GOERLI" ? "Check current network" : "Goërli Network"}
        </p>
        <Burner />
        <div />
        <div className={styles.walletContainer}>
          <Wallet />
          <UserBalance />
        </div>
        <Form />
        <footer className={styles.footer}>version {version} 🥰 </footer>
      </main>
    </div>
  );
}
