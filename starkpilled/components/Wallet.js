import { useStarknet, useConnectors } from "@starknet-react/core";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import Image from "next/image";
import { sliceAddress } from "../lib/handleData";
import styles from "../styles/Wallet.module.css";

export default function Wallet() {
  const { account } = useStarknet();
  const { available, connect, disconnect } = useConnectors();

  return account ? (
    <div
      className={styles.connectedWrapper}
      onClick={() => navigator.clipboard.writeText(account)}
    >
      <Jazzicon diameter={16} seed={jsNumberForAddress(account)} />
      <p className={styles.accountAddress}>{sliceAddress(account)}</p>
      <Image
        src="/connect.svg"
        className={styles.iconDisconnect}
        width={20}
        height={20}
        onClick={() => disconnect()}
      />
    </div>
  ) : available?.length > 0 ? (
    <div className={styles.disconnectedWrapper}>
      <div
        className={styles.connectButton}
        onClick={() => connect(available[0])}
      >
        <Image
          src="/connect.svg"
          className={styles.iconConnect}
          width={20}
          height={20}
        />
        <span>{available[0].name()}</span>
      </div>
    </div>
  ) : (
    <></>
  );
}
