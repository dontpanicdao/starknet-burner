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
import { generateKey } from "lib/handleKey";
import Loader from "components/Loader";
import { eventHandler, injectSetDisplay } from "lib/message";

import Layout from "components/Layout";
import AskForDrone from "components/AskForDrone";
import Connected from "components/Connected";

export default function Home() {
  const [state, setState, key, setKey] = useStateContext();
  const [sessionToken, setSessionToken] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState(false);

  const getDroneData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/drone/?k=${key}`);
      if (res.status !== 200) {
        setLoading(false);
      }
      const data = await res.json();
      saveLocalStorage("bwsessiontoken", JSON.stringify(data));
      setSessionToken(data);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!sessionToken && displayed) {
      const interval = setInterval(async () => {
        await getDroneData().catch(console.error);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [key, sessionToken, displayed]);

  useEffect(() => {
    injectSetDisplay(setDisplayed);
    window.addEventListener("message", eventHandler);
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
        return;
      }
      setState(CONNECTED);
    }
  }, [key, sessionToken]);

  return (
    <Layout>
      <main className={styles.main}>
        {state === UNINITIALIZED && <Loader />}
        {state === INITIALIZED && (
          <AskForDrone
            accessKey={key}
            isLoading={isLoading}
            sessionToken={sessionToken}
          />
        )}
        {state === CONNECTED && <Connected sessionToken={sessionToken} />}
      </main>
    </Layout>
  );
}
