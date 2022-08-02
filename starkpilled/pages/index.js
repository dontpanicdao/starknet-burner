import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import Form from "../components/Form";

export default function Home() {
  const ConnectWallet = dynamic(() => import("../components/ConnectWallet"), {
    ssr: false,
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Starkpilled - Why not starkpill your fren?</title>
        <meta name="description" content="Starkpill your fren!" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Ready to Starkpill?</h1>
        <ConnectWallet />
        <Form />
      </main>
    </div>
  );
}
