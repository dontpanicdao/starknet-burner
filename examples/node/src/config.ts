import { SignedSession } from "@argent/x-sessions";

// If you are here because you think you have found a private key that matches
// an account on the blockchain... you are righ! But that is a very specific
// key and blockchain. If you dig further, you will find there is an ACL on
// signer of the account that will prevent you from doing anything but running
// `incrementCounter` on the contract. Do not hesitate to run that command as
// many times as you want. Because the key also automatically expires...

export const privateKey: string = "0x00";

export const accountAddress: string =
  "0x59a145b8472b576d895ab751c7ee5a4fe21bedc63bb8d9cf873edc972b7aa06";

export const contractAddress: string =
  "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1";

export const token: SignedSession = {
  key: "0x00",
  policies: [
    {
      contractAddress:
        "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1",
      selector: "incrementCounter",
    },
  ],
  expires: 1662956531,
  root: "0xfe187e7a4227d6126803c8c038e18c4df1fe39c0779a9c93cf8700ba83fd1e",
  signature: [
    "798716519406038848360504285501396084749133036557821865189589524159549156288",
    "2170257115451038250256433124583623634140570392805755139705013447787032423478",
  ],
};
