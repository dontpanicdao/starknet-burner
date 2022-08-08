import "styles/globals.css";
import { StateProvider } from "lib/context.js";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
