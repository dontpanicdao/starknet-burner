import {
  StarknetProvider,
  getInstalledInjectedConnectors,
} from "@starknet-react/core";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Block from "./Block";
import About from "./About";

function App() {
  const connectors = getInstalledInjectedConnectors();

  return (
    <StarknetProvider connectors={connectors}>
      <BrowserRouter>
        <Link to="/">Home</Link> <Link to="/block">Block</Link>{" "}
        <Link to="/about">About</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="block" element={<Block />} />
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </StarknetProvider>
  );
}

export default App;
