import {
  Abi,
  Invocation,
  InvocationsSignerDetails,
  KeyPair,
  Signature,
} from "starknet/types";
import { getStarkKey, sign } from "starknet/utils/ellipticCurve";
import {
  calculcateTransactionHash,
  getSelectorFromName,
} from "starknet/utils/hash";
import { fromCallsToExecuteCalldataWithNonce } from "starknet/utils/transaction";
import { TypedData, getMessageHash } from "starknet/utils/typedData";
import { SignerInterface } from "starknet/signer/interface";

export class Signer implements SignerInterface {
  protected keyPair: KeyPair;

  constructor(keyPair: KeyPair) {
    this.keyPair = keyPair;
  }

  public async getPubKey(): Promise<string> {
    return getStarkKey(this.keyPair);
  }

  public async signTransaction(
    transactions: Invocation[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[]
  ): Promise<Signature> {
    if (abis && abis.length !== transactions.length) {
      throw new Error(
        "ABI must be provided for each transaction or no transaction"
      );
    }
    // now use abi to display decoded data somewhere, but as this signer is headless, we can't do that

    const calldata = fromCallsToExecuteCalldataWithNonce(
      transactions,
      transactionsDetail.nonce
    );

    const msgHash = calculcateTransactionHash(
      transactionsDetail.walletAddress,
      transactionsDetail.version,
      getSelectorFromName("__execute__"),
      calldata,
      transactionsDetail.maxFee,
      transactionsDetail.chainId
    );

    return sign(this.keyPair, msgHash);
  }

  public async signMessage(
    typedData: TypedData,
    accountAddress: string
  ): Promise<Signature> {
    const msgHash = getMessageHash(typedData, accountAddress);
    return sign(this.keyPair, msgHash);
  }
}
