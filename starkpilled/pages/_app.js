import {
  getInstalledInjectedConnectors,
  StarknetProvider,
} from "@starknet-react/core";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const connectors = getInstalledInjectedConnectors();
  return (
    <StarknetProvider connectors={connectors} autoConnect>
      <Component {...pageProps} />
    </StarknetProvider>
  );
}

export default MyApp;
