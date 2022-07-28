import Head from "next/head";
import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";
import { isLocalStorage } from "lib/handleLocalStorage";
import Loader from "components/Loader";

export default function Home() {
  const [state, setState] = useState({ status: "UNINITIALIZED" });

  useEffect(() => {
    if (window) {
      const checkLocalStorage = isLocalStorage("bwsessionkey");
      if (!checkLocalStorage) {
        //
      } else {
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet</title>
        <meta name="description" content="wallet view" />
      </Head>
      <main className={styles.main} style={{ width: "100vw", height: "100vh" }}>
        {state.status === "UNINITIALIZED" && <Loader />}
      </main>
    </div>
  );
}
