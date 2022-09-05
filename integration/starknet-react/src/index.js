import React from "react";
import ReactDOM from "react-dom/client";
import { register } from "@starknet/burner";
import {
  StarknetProvider,
  getInstalledInjectedConnectors,
} from "@starknet-react/core";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Starknet from "./Starknet";
import Block from "./Block";
import Call from "./Call";
import Connectors from "./Connectors";
import Contract from "./Contract";
import Execute from "./Execute";
import Invoke from "./Invoke";
import SignTypedData from "./SignTypedData";
import TransactionManager from "./TransactionManager";
import About from "./About";

register();

const App = () => {
  const connectors = getInstalledInjectedConnectors();

  return (
    <StarknetProvider connectors={connectors}>
      <BrowserRouter>
        <Link to="/">Home</Link> <Link to="/block">Block</Link>{" "}
        <Link to="/call">Call</Link> <Link to="/connectors">Connectors</Link>{" "}
        <Link to="/contract">Contract</Link> <Link to="/execute">Execute</Link>{" "}
        <Link to="/invoke">Invoke</Link>{" "}
        <Link to="/signtypeddata">SignTypedData</Link>{" "}
        <Link to="/transactions">TransactionManager</Link>{" "}
        <Link to="/about">About</Link>
        <Routes>
          <Route path="/" element={<Starknet />} />
          <Route path="block" element={<Block />} />
          <Route path="call" element={<Call />} />
          <Route path="connectors" element={<Connectors />} />
          <Route path="contract" element={<Contract />} />
          <Route path="execute" element={<Execute />} />
          <Route path="invoke" element={<Invoke />} />
          <Route path="signtypeddata" element={<SignTypedData />} />
          <Route path="transactions" element={<TransactionManager />} />
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </StarknetProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
