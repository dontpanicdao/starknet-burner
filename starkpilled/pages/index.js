import Head from "next/head";
import styles from "../styles/Home.module.css";
import Form from "../components/Form";
import KeyManager from "../components/KeyManager";
import { version } from "../lib/version";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Starkpilled</title>
        <meta name="description" content="Fren, you've been Starkpilled!" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#90cdf4" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>fren, Starkpilled?</h1>
        <KeyManager />
        <Form />
        <footer className={styles.footer}>version {version} 🥰</footer>
      </main>
    </div>
  );
}
