import { ZERO } from "starknet/constants";
import {
  Abi,
  Call,
  InvocationsDetails,
  Signature,
  RawCalldata,
} from "starknet/types/lib";
import { InvokeFunctionResponse } from "starknet/types/provider";
import { InvocationsSignerDetails } from "starknet/types/signer";
import { BigNumberish, toBN, toHex } from "starknet/utils/number";
import { TypedData } from "starknet/utils/typedData/types";
import { AccountInterface } from "starknet/account/interface";
import { EstimateFeeDetails, EstimateFee } from "starknet/types/account";
import { SignerInterface } from "starknet/signer/interface";
import { Provider } from "./provider";
import { Signer } from "./signer";

type EVENT = [(data: any) => void];
type EventHandlers = {
  session_loaded: EVENT;
};
export const SESSION_LOADED_EVENT = "SESSION_LOADED_EVENT";

export class Account extends Provider implements AccountInterface {
  public signer: SignerInterface;

  constructor(public address: string) {
    super();
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
    const version = toBN("0x0");

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

    const calldata: RawCalldata = [];
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

    const suggestedMaxFee = toBN("0x0");

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
    _: Call | Call[],
    __: Abi[] | undefined = undefined,
    ___: InvocationsDetails = {}
  ): Promise<InvokeFunctionResponse> {
    return this.invokeFunction(
      {
        contractAddress: "0x0",
        entrypoint: "__execute__",
        calldata: [],
        signature: [],
      },
      {
        maxFee: "0x0",
        version: "0x0",
      }
    );
  }

  public async signMessage(typedData: TypedData): Promise<Signature> {
    return this.signer.signMessage(typedData, this.address);
  }

  public async hashMessage(_: TypedData): Promise<string> {
    return "0x0";
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
    _: BigNumberish,
    __: Signature
  ): Promise<boolean> {
    return true;
  }

  /**
   * Verify a signature of a JSON object
   *
   * @param hash - hash to be verified
   * @param signature - signature of the hash
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the signature is not a valid signature
   */
  public async verifyMessage(_: TypedData, __: Signature): Promise<boolean> {
    return true;
  }

  public _events: EventHandlers = {
    session_loaded: [
      (data: any) => {
        this.address = data.account;
      },
    ],
  };
}

export const account = new Account("0x0");

export const addEvent = (type: string, fn: (data: any) => void) => {
  if (type === SESSION_LOADED_EVENT) {
    account._events.session_loaded.push(fn);
  }
};
