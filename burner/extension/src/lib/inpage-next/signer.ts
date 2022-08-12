import { SignerInterface } from "starknet/signer/interface";

import { InvocationsSignerDetails } from "starknet/types/signer";

import { Abi, Invocation, Signature } from "starknet/types/lib";

import { TypedData } from "starknet/utils/typedData/types";

export class Signer implements SignerInterface {
  public async getPubKey(): Promise<string> {
    return "0x0";
  }

  public async signTransaction(
    _: Invocation[],
    __: InvocationsSignerDetails,
    ___?: Abi[]
  ): Promise<Signature> {
    return ["0x0"];
  }

  public async signMessage(_: TypedData, __: string): Promise<Signature> {
    return ["0x0"];
  }
}
