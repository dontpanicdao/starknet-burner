import Head from "next/head";
import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";
import { reply } from "lib/reply";
import {
  useStateContext,
  UNINITIALIZED,
  INITIALIZED,
  CONNECTED,
} from "lib/context";
import {
  getLocalStorage,
  saveLocalStorage,
  removeLocalStorage,
} from "lib/handleLocalStorage";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { generateKey } from "lib/handleKey";
import Loader from "components/Loader";
import QRCode from "components/QRCode";

export default function Home() {
  const [state, setState, key, setKey] = useStateContext();
  const [sessionToken, setSessionToken] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/drone");
      const data = await res.json();
      saveLocalStorage("bwsessiontoken", JSON.stringify(data));
      setSessionToken(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleMessage = (event) => {
    if (event && event.data) {
      const evtIn =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      if (evtIn.name) {
        switch (evtIn.name) {
          case "initialize":
            handleCloseSession();
            break;
          default:
            console.log(`inside: ${evtIn.name}, value: ${evtIn.value}`);
            reply({ name: "test" });
        }
      }
    }
  };

  const handleCloseSession = () => {
    removeLocalStorage();
    setState(UNINITIALIZED);
    setKey(null);
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (window) {
      let sessionKey = getLocalStorage("bwsessionkey");
      if (!sessionKey) {
        removeLocalStorage();
        const timer = setTimeout(() => {
          sessionKey = generateKey();
          saveLocalStorage("bwsessionkey", sessionKey);
          setKey(sessionKey);
          setState(INITIALIZED);
        }, 1000);
        return () => clearTimeout(timer);
      }
      setKey(sessionKey);
      const token = getLocalStorage("bwsessiontoken");
      if (!token) {
        setState(INITIALIZED);
        return;
      }
      if (!sessionToken) {
        setSessionToken(JSON.parse(token));
      }
      setState(CONNECTED);
    }
  }, [key, sessionToken]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet</title>
        <meta name="description" content="wallet view" />
      </Head>
      <main className={styles.main}>
        {state === UNINITIALIZED && <Loader message="Key generation..." />}
        {state === INITIALIZED && (
          <>
            <div className={styles.title}>
              <h1>Welcome (back) Fren !</h1>
              <p>Life is all about choices, so...</p>
              <button onClick={handleCloseSession}>reset session</button>
            </div>

            <div className={styles.choicesContainer}>
              <div className={styles.choice}>
                <a target="_blank" href={`https://drone.blaqkube.io/?s=${key}`}>
                  <QRCode value={`https://drone.blaqkube.io/?s=${key}`} />
                </a>
                <h4>You can scan this QR Code</h4>
              </div>
              <div className={styles.choice}>
                <button className={styles.button} onClick={handleClick}>
                  {isLoading ? "Loading..." : "Load..."}
                </button>

                <h3>Click once signed</h3>
              </div>
            </div>
          </>
        )}
        {state === CONNECTED && (
          <>
            <button onClick={handleCloseSession}>reset session</button>
            <h6>Account : {sessionToken?.account}</h6>
            <Jazzicon
              diameter={48}
              seed={jsNumberForAddress(sessionToken?.account)}
            />
            <h6>Expires : {sessionToken?.expires}</h6>
          </>
        )}
      </main>
    </div>
  );
}
