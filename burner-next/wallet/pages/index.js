import Head from "next/head";
import styles from "styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet</title>
        <meta name="description" content="wallet view" />
      </Head>
      <main className={styles.main} style={{ width: "100vw", height: "100vh" }}>
        Hello
      </main>
    </div>
  );
}
