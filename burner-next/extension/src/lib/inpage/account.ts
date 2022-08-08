import { ZERO } from "starknet/constants";
import { Provider } from "starknet/provider/default";
import { SignerInterface } from "starknet/signer";
import { Signer } from "./signer";
import {
  Abi,
  Call,
  InvocationsDetails,
  InvocationsSignerDetails,
  InvokeFunctionResponse,
  Signature,
} from "starknet/types";
import { EstimateFee, EstimateFeeDetails } from "starknet/types/account";
import { feeTransactionVersion, transactionVersion } from "starknet/utils/hash";
import { BigNumberish, toBN, toHex } from "starknet/utils/number";
import { compileCalldata, estimatedFeeToMaxFee } from "starknet/utils/stark";
import { fromCallsToExecuteCalldataWithNonce } from "starknet/utils/transaction";
import { TypedData, getMessageHash } from "starknet/utils/typedData";
import { AccountInterface } from "starknet/account";

import { request } from "./message";
import { defaultProvider } from "starknet";

type EVENT = [(data: any) => void];
type EventHandlers = {
  session_loaded: EVENT;
};
export const SESSION_LOADED_EVENT = "SESSION_LOADED_EVENT";

type ACTION = (data: any) => void;
type ActionHandlers = {
  reset: ACTION;
  reload: ACTION;
};

const RESET_ACTION = "RESET_ACTION";
const RELOAD_ACTION = "RELOAD_ACTION";

export class Account extends Provider implements AccountInterface {
  public signer: SignerInterface;

  constructor(public address: string) {
    super(defaultProvider);
    this.address = address;
    this.signer = new Signer();
  }

  public async getNonce(): Promise<string> {
    const { result } = await this.callContract({
      contractAddress: this.address,
      entrypoint: "get_nonce",
    });
    return toHex(toBN(result[0]));
  }

  public async estimateFee(
    calls: Call | Call[],
    { nonce: providedNonce, blockIdentifier }: EstimateFeeDetails = {}
  ): Promise<EstimateFee> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = providedNonce ?? (await this.getNonce());
    const version = toBN(feeTransactionVersion);

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce: toBN(nonce),
      maxFee: ZERO,
      version,
      chainId: this.chainId,
    };

    const signature = await this.signer.signTransaction(
      transactions,
      signerDetails
    );

    const calldata = fromCallsToExecuteCalldataWithNonce(transactions, nonce);
    const response = await super.getEstimateFee(
      {
        contractAddress: this.address,
        entrypoint: "__execute__",
        calldata,
        signature,
      },
      blockIdentifier,
      { version }
    );

    const suggestedMaxFee = estimatedFeeToMaxFee(response.overall_fee);

    return {
      ...response,
      suggestedMaxFee,
    };
  }

  /**
   * Invoke execute function in account contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param calls - one or more calls to be executed
   * @param abis - one or more abis which can be used to display the calls
   * @param transactionsDetail - optional transaction details
   * @returns a confirmation of invoking a function on the starknet contract
   */
  public async execute(
    calls: Call | Call[],
    abis: Abi[] | undefined = undefined,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<InvokeFunctionResponse> {
    const transactions = Array.isArray(calls) ? calls : [calls];
    const nonce = toBN(transactionsDetail.nonce ?? (await this.getNonce()));
    let maxFee: BigNumberish = "0";
    if (transactionsDetail.maxFee || transactionsDetail.maxFee === 0) {
      maxFee = transactionsDetail.maxFee;
    } else {
      const { suggestedMaxFee } = await this.estimateFee(transactions, {
        nonce,
      });
      maxFee = suggestedMaxFee.toString();
    }

    const version = toBN(transactionVersion);

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce,
      maxFee,
      version,
      chainId: this.chainId,
    };

    const signature = await this.signer.signTransaction(
      transactions,
      signerDetails,
      abis
    );

    const calldata = fromCallsToExecuteCalldataWithNonce(transactions, nonce);

    return this.invokeFunction(
      {
        contractAddress: this.address,
        entrypoint: "__execute__",
        calldata,
        signature,
      },
      {
        maxFee,
        version,
      }
    );
  }

  /**
   * Sign an JSON object with the starknet private key and return the signature
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public async signMessage(typedData: TypedData): Promise<Signature> {
    return this.signer.signMessage(typedData, this.address);
  }

  /**
   * Hash a JSON object with pederson hash and return the hash
   *
   * @param json - JSON object to be hashed
   * @returns the hash of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public async hashMessage(typedData: TypedData): Promise<string> {
    return getMessageHash(typedData, this.address);
  }

  /**
   * Verify a signature of a given hash
   * @warning This method is not recommended, use verifyMessage instead
   *
   * @param hash - JSON object to be verified
   * @param signature - signature of the JSON object
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the JSON object is not a valid JSON or the signature is not a valid signature
   */
  public async verifyMessageHash(
    hash: BigNumberish,
    signature: Signature
  ): Promise<boolean> {
    try {
      await this.callContract({
        contractAddress: this.address,
        entrypoint: "is_valid_signature",
        calldata: compileCalldata({
          hash: toBN(hash).toString(),
          signature: signature.map((x) => toBN(x).toString()),
        }),
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify a signature of a JSON object
   *
   * @param hash - hash to be verified
   * @param signature - signature of the hash
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the signature is not a valid signature
   */
  public async verifyMessage(
    typedData: TypedData,
    signature: Signature
  ): Promise<boolean> {
    const hash = await this.hashMessage(typedData);
    return this.verifyMessageHash(hash, signature);
  }

  public _events: EventHandlers = {
    session_loaded: [
      (data: any) => {
        this.address = data.account;
      },
    ],
  };

  public _actions: ActionHandlers = {
    reset: () => {
      console.log("send reset action");
      request({ type: RESET_ACTION, data: {} });
    },
    reload: () => {
      request({ type: RELOAD_ACTION, data: {} });
    },
  };
}

export const account = new Account("0x0");

export const addEvent = (type: string, fn: (data: any) => void) => {
  if (type === SESSION_LOADED_EVENT) {
    account._events.session_loaded.push(fn);
  }
};
