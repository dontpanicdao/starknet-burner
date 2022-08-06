import Head from "next/head";
import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";
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
import { notify } from "../extension/message";

export default function Home() {
  const [state, setState, key, setKey] = useStateContext();
  const [sessionToken, setSessionToken] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/drone/?k=${key}`);
      if (res.status !== 200) {
        setLoading(false);
        return setIsError("Sign with drone!");
      }
      const data = await res.json();
      saveLocalStorage("bwsessiontoken", JSON.stringify(data));
      notify({ type: "SESSION_TOKEN_LOADED", data });
      setSessionToken(data);
    } catch (error) {
      setLoading(false);
      setIsError(error);
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
        {state === UNINITIALIZED && <Loader />}
        {state === INITIALIZED && (
          <>
            <div className={styles.choicesContainer}>
              <div className={styles.choice}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://drone.blaqkube.io/?s=${key}`}
                >
                  <QRCode value={`https://drone.blaqkube.io/?s=${key}`} />
                </a>
              </div>
              <div className={styles.choice}>
                <button className={styles.button} onClick={handleClick}>
                  {isLoading ? "Loading..." : "Load..."}
                </button>
              </div>
              <p className={styles.alert}>{isError}</p>
            </div>
          </>
        )}
        {state === CONNECTED && (
          <div className={styles.sessionContent}>
            <Jazzicon
              diameter={16}
              seed={jsNumberForAddress(sessionToken?.account)}
            />
            <p
              className={styles.accountAddress}
              onClick={() =>
                navigator.clipboard.writeText(sessionToken?.account)
              }
            >
              {sessionToken?.account.slice(0, 5) +
                "..." +
                sessionToken?.account.slice(-4)}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
