import styles from "styles/Pin.module.css";
import { useEffect, useState } from "react";

export default ({ accessKey, modalProperties }) => {
  const [requestId, setRequestId] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://drone.carnage.sh/requests", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: accessKey,
          dappTokenID: modalProperties.tokenId,
        }),
      });
      const content = await res.json();
      setRequestId(content.requestID);
    })();
  }, []);

  return (
    <div className={styles.choicesContainer}>
      <div className={styles.choice}>
        {requestId
          ? requestId
              .toString()
              .split("")
              .map((num, i) => (
                <span className={styles.number} key={i}>
                  {num}
                </span>
              ))
          : "loading..."}
      </div>
    </div>
  );
};
