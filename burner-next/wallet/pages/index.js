import Head from "next/head";
import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";
import { isLocalStorage, saveInLocalStorage } from "lib/handleLocalStorage";
import { generateKey } from "lib/handleKey";
import Loader from "components/Loader";

export default function Home() {
  const [state, setState] = useState({ status: "UNINITIALIZED" });

  useEffect(() => {
    if (window) {
      const checkLocalStorage = isLocalStorage("bwsessionkey");

      if (!checkLocalStorage) {
        const key = generateKey();
        saveInLocalStorage("bwsessionkey", key);
        setState({ status: "INITIALIZED" });
      } else {
        setState({ status: "INITIALIZED" });
      }
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet</title>
        <meta name="description" content="wallet view" />
      </Head>
      <main className={styles.main} style={{ width: "100vw", height: "100vh" }}>
        {state.status === "UNINITIALIZED" && <Loader />}
        {state.status === "INITIALIZED" && <h1>Hello</h1>}
      </main>
    </div>
  );
}
