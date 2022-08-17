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
import { notify, SESSION_LOADED_EVENT } from "lib/extension/message";
import { eventHandler } from "lib/message";

import Layout from "components/Layout";
import AskForDrone from "components/AskForDrone";
import Connected from "components/Connected";

export default function Home() {
  const [state, setState, key, setKey] = useStateContext();
  const [sessionToken, setSessionToken] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleCloseSession = () => {
    removeLocalStorage();
    setState(UNINITIALIZED);
    setKey(null);
  };

  const windowEventHandler = eventHandler({
    resetAction: handleCloseSession,
    reloadAction: () => {
      let token = getLocalStorage("bwsessiontoken");
      if (token) {
        return notify({ type: SESSION_LOADED_EVENT, data: JSON.parse(token) });
      }
    },
  });

  const getDroneData = async () => {
    setLoading(true);
    try {
      //   console.log("launch call");
      const res = await fetch(`/api/drone/?k=${key}`);
      if (res.status !== 200) {
        setLoading(false);
      }
      const data = await res.json();
      saveLocalStorage("bwsessiontoken", JSON.stringify(data));
      notify({ type: SESSION_LOADED_EVENT, data });
      setSessionToken(data);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!sessionToken) {
      const interval = setInterval(async () => {
        await getDroneData().catch(console.error);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [key, sessionToken]);

  {
    useEffect(() => {
      window.addEventListener("message", eventHandler);
    }, []);
  }

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
      notify({ type: SESSION_LOADED_EVENT, data: sessionToken });
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
