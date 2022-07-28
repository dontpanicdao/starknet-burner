import Head from "next/head";
import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";
import { useStateContext } from "lib/context";
import { getLocalStorage, saveLocalStorage } from "lib/handleLocalStorage";
import { generateKey } from "lib/handleKey";
import Loader from "components/Loader";

export default function Home() {
  const [state, setState] = useStateContext();
  const [key, setKey] = useState();

  useEffect(() => {
    if (window) {
      const sessionKey = getLocalStorage("test");
      if (!sessionKey) {
        setState("UNINITIALIZED");
        const timer = setTimeout(() => {
          const key = generateKey();
          saveLocalStorage("test", key);
          setState("UNINITIALIZED");
          setKey(key);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setState("INITIALIZED");
        setKey(sessionKey);
      }
    }
  }, [key]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet</title>
        <meta name="description" content="wallet view" />
      </Head>
      <main className={styles.main} style={{ width: "100vw", height: "100vh" }}>
        {state === "UNINITIALIZED" && <Loader message="Key generation..." />}
        {state === "INITIALIZED" && (
          <>
            <h1>Hello</h1>
            <span>key is {key}</span>
          </>
        )}
      </main>
    </div>
  );
}
