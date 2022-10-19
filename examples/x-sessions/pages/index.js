import { useEffect, useState } from "react";
import Link from "next/link";
import SessionKey from "components/SessionKey";
import ArgentX from "components/ArgentX";
import Authorize from "components/Authorize";
import IncrementCounter from "components/IncrementCounter";
import GetCount from "components/GetCount";
import { originalIncrementContract } from "lib/constants";

export const Dapp = () => {
  const [sessionPrivateKey, setSessionPrivateKey] = useState("");
  const [argentXAccount, setArgentXAccount] = useState();
  const [sessionAccount, setSessionAccount] = useState();

  return (
    <main>
      <Link href="/">Back</Link>
      <h2>Dapp with SessionKey</h2>
      <p></p>
      <h3>1. Generates a Private Key</h3>
      <SessionKey
        keyname="GameSessionKey"
        setSessionPrivateKey={setSessionPrivateKey}
      />
      <h3>2. Connect to Argent-X</h3>
      <ArgentX setArgentAccount={setArgentXAccount} />
      <h3>3. Request an Authorization</h3>
      {argentXAccount ? (
        <Authorize
          sessionPrivateKey={sessionPrivateKey}
          argentxAccount={argentXAccount}
          setSessionAccount={setSessionAccount}
        />
      ) : (
        <div>blocked for now... connect to argent-X</div>
      )}
      <h3>4. Use the Authorization</h3>
      {sessionAccount ? (
        <IncrementCounter
          account={sessionAccount}
          contractAddress={originalIncrementContract}
        />
      ) : (
        <div>blocked for now... get an authorization!</div>
      )}
      <h3>5. Check the Value</h3>
      {sessionAccount ? (
        <GetCount
          account={sessionAccount}
          contractAddress={originalIncrementContract}
        />
      ) : (
        <div>blocked for now... get an authorization!</div>
      )}
      <Link href="/">Back</Link>
    </main>
  );
};

export default Dapp;
