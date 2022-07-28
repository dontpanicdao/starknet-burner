import Head from "next/head";
import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";
import { useStateContext } from "lib/context";
import {
  getLocalStorage,
  saveLocalStorage,
  removeLocalStorage,
} from "lib/handleLocalStorage";
import { generateKey } from "lib/handleKey";
import Loader from "components/Loader";
import QRCode from "components/QRCode";

export default function Home() {
  const [state, setState, key, setKey] = useStateContext();
  const [dataFetched, setDataFetched] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await fetch("/api/drone")
      .then((res) => res.json())
      .then((data) => {
        setDataFetched(data);
        setLoading(false);
      });
  };

  const handleCloseSession = () => {
    removeLocalStorage();
    setState(null);
    setKey(null);
  };

  useEffect(() => {
    if (window) {
      const sessionKey = getLocalStorage("bwsessionkey");

      if (!sessionKey) {
        setState("UNINITIALIZED");
        const timer = setTimeout(() => {
          const key = generateKey();
          saveLocalStorage("bwsessionkey", key);
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
      <main className={styles.main}>
        {state === "UNINITIALIZED" && <Loader message="Key generation..." />}
        {state === "INITIALIZED" && (
          <>
            <div className={styles.title}>
              <h1>Welcome (back) Fren !</h1>
              <p>Life is all about choices, so...</p>
              <button onClick={() => handleCloseSession()}>
                close your session
              </button>
            </div>

            <div className={styles.choicesContainer}>
              <div className={styles.choice}>
                <QRCode value={`https://drone.blaqkube.io/?s=${key}`} />
                <h4>You can scan this QR Code</h4>
              </div>
              <div className={styles.choice}>
                <button className={styles.button} onClick={() => handleClick()}>
                  {isLoading ? "Loading..." : "Sign Key !"}
                </button>

                <h3>Or click this button</h3>
              </div>
            </div>
            {dataFetched && (
              <>
                <h6>Account : {dataFetched.account}</h6>
                <h6>Expires : {dataFetched.expires}</h6>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
