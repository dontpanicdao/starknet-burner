import { describe, it } from "vitest";
import { ec, Provider } from "starknet4";
import { StarknetChainId } from "starknet4/constants";
import type {
  Call,
  ProviderOptions,
  SequencerProviderOptions,
} from "starknet4";
import { SessionAccount } from "@argent/x-sessions";

import { SignedSession } from "@argent/x-sessions";

export const privateKey: string = "0x1";

export const contractAddress: string =
  "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1";

// If you are here because you think you have found a private key that matches
// an account on the blockchain... Well you are right! But that is a very
// specific key and blockchain. If you dig further, you will find there is an
// ACL on this signer that must be collected offchain. This ACL prevent you
// from doing anything but running `incrementCounter` on the contract. Do not
// hesitate to run that command as many times as you want. Because the key also
// automatically expires...

export const accountAddress: string =
  "0x59a145b8472b576d895ab751c7ee5a4fe21bedc63bb8d9cf873edc972b7aa06";

export const signedSession: SignedSession = {
  key: "0x01ef15c18599971b7beced415a40f0c7deacfd9b0d1819e03d723d8bc943cfca",
  policies: [
    {
      contractAddress:
        "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1",
      selector: "incrementCounter",
    },
  ],
  expires: 1662967187,
  root: "0xfe187e7a4227d6126803c8c038e18c4df1fe39c0779a9c93cf8700ba83fd1e",
  signature: [
    "583597514411274243094318381125103122779702871930858130969366498288744638711",
    "1886397678782581237526344064967860384672530250938170380144074112339937711816",
  ],
};

describe("execute a transaction with that session", () => {
  it("let's run a transaction...", async () => {
    const keypair = ec.getKeyPair(privateKey);
    const SequencerProvider = new Provider({
      sequencer: {
        chainId: StarknetChainId.TESTNET,
        // https://alpha4.starknet.io
        baseUrl: "http://localhost:8080",
        // https://alpha4.starknet.io/feeder_gateway/
        feederGatewayUrl: "http://localhost:8080/feeder_gateway/",
        // https://alpha4.starknet.io/gateway/
        gatewayUrl: "http://localhost:8080/gateway/",
      } as SequencerProviderOptions,
    } as ProviderOptions);
    const sessionAccount = new SessionAccount(
      SequencerProvider,
      accountAddress,
      keypair,
      signedSession
    );
    const tx = await sessionAccount.execute({
      contractAddress:
        "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1",
      entrypoint: "incrementCounter",
      calldata: ["0x1"],
    } as Call);
    console.log(tx);
  });
});
