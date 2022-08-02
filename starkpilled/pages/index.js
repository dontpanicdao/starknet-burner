import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Starkpilled - Why not starkpill your fren?</title>
        <meta name="description" content="Starkpill your fren!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Ready to Starkpill?</h1>
      </main>
    </div>
  );
}
