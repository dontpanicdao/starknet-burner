import styles from "styles/Home.module.css";
import { useEffect, useState } from "react";
import {
  useStateContext,
  UNINITIALIZED,
  INITIALIZED,
  CONNECTED,
} from "lib/ui/context";
import {
  getLocalStorage,
  saveLocalStorage,
  removeLocalStorage,
} from "lib/storage";
import { generateKey } from "lib/sessionkey";
import Loader from "components/Loader";
import { eventHandler, injectSets } from "lib/index";
import { newLog } from "../lib/shared/log";

const log = newLog();
import Layout from "components/Layout";
import AskForDrone from "components/AskForDrone";
import Connected from "components/Connected";
import CloseButton from "components/CloseButton";
import { getKeyPair, getStarkKey } from "starknet4/utils/ellipticCurve";

export default function Home() {
  const [state, setState, key, setKey] = useStateContext();
  const [sessionToken, setSessionToken] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState(false);

  const resetSessionKey = () => {
    removeLocalStorage("bwsessiontoken");
    const sessionKey = generateKey();
    saveLocalStorage("bwsessionkey", sessionKey);
    setSessionToken(null);
    const keyPair = getKeyPair(sessionKey);
    setKey(getStarkKey(keyPair));
    setState(INITIALIZED);
  };

  const getDroneData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://drone.carnage.sh/${key}`);
      if (res.status !== 200) {
        return setLoading(false);
      }
      const data = await res.json();
      saveLocalStorage("bwsessiontoken", JSON.stringify(data));
      console.log("session key", data);
      setSessionToken(data);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!sessionToken && displayed) {
      const interval = setInterval(async () => {
        await getDroneData().catch(log.debug);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [key, sessionToken, displayed]);

  useEffect(() => {
    injectSets({ setDisplayed, resetSessionKey });
    window.addEventListener("message", eventHandler);
    addEventListener("beforeunload", () => {
      console.log("unloading onMessage event");
      window.removeEventListener("message", eventHandler);
    });
  }, []);

  useEffect(() => {
    if (window) {
      let sessionKey = getLocalStorage("bwsessionkey");
      if (!sessionKey) {
        removeLocalStorage();
        const timer = setTimeout(() => {
          resetSessionKey();
        }, 1000);
        return () => clearTimeout(timer);
      }
      const keyPair = getKeyPair(sessionKey);
      setKey(getStarkKey(keyPair));
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
      <CloseButton />
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
