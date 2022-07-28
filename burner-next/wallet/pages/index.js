import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    if (event && event.data) {
      const evtIn =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      if (evtIn.name) {
        console.log(`inside: ${evtIn.name}, value: ${evtIn.value}`);
        const evtOut = { name: "sendOut" };
        setMessage(evtIn.value);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet</title>
        <meta name="description" content="wallet view" />
      </Head>
      <main className={styles.main} style={{ width: "100vw", height: "100vh" }}>
        {message}
      </main>
    </div>
  );
}
