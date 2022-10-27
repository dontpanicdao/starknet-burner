import styles from "styles/Pin.module.css";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://drone.carnage.sh";

export const Pin = ({ accessKey, modalProperties }) => {
  const [requestId, setRequestId] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/requests`, {
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
    <div className={styles.containers}>
      <div className={styles.numbers}>
        {requestId
          ? requestId
              .toString()
              .split("")
              .map((num, i) => (
                <div className={styles.number} key={i}>
                  {num}
                </div>
              ))
          : "loading..."}
      </div>
    </div>
  );
};

export default Pin;
