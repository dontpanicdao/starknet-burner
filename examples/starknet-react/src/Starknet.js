import Connect from "./components/Connect.jsx";
import Account from "./components/Account.jsx";

const Home = () => {
  return (
    <div>
      <h2>useStarknet (and useConnectors)</h2>
      <Account />
      <Connect />
    </div>
  );
};

export default Home;
