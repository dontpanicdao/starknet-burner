import Head from "next/head";
import styles from "styles/Layout.module.css";
import { version } from "lib/version";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Key ring</title>
        <meta name="description" content="key ring view" />
      </Head>
      {children}
      <footer className={styles.footer}>version {version} 🥰</footer>
    </div>
  );
};

export default Layout;
