import { expect, describe, it } from "vitest";
import { Call as Call3 } from "starknet3";
import { Call as Call4 } from "starknet4";
import { GetBlockResponse as GetBlockResponse3 } from "starknet3";
import { GetBlockResponse as GetBlockResponse4 } from "starknet4";
import { Invocation as Invocation3 } from "starknet3";
import { Invocation as Invocation4 } from "starknet4";
import { AddTransactionResponse as AddTransactionResponse3 } from "starknet3";
import { InvokeFunctionResponse as InvokeFunctionResponse4 } from "starknet4";

// prettier-ignore
type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

describe("evaluating differences between types", () => {
  it("Call", async () => {
    type EQ = IfEquals<Call3, Call4, "equal", "different">;
    const eq: EQ = "equal";
    expect(eq).toBe("equal");
  });

  it("GetBlockResponse", async () => {
    type EQ = IfEquals<
      GetBlockResponse3,
      GetBlockResponse4,
      "equal",
      "different"
    >;
    const eq: EQ = "different";
    expect(eq).toBe("different");
  });

  it("Invocation", async () => {
    type EQ = IfEquals<Invocation3, Invocation4, "equal", "different">;
    const eq: EQ = "equal";
    expect(eq).toBe("equal");
  });

  it("InvokeFunctionResponse", async () => {
    type EQ = IfEquals<
      AddTransactionResponse3,
      InvokeFunctionResponse4,
      "equal",
      "different"
    >;
    const eq: EQ = "different";
    expect(eq).toBe("different");
  });
});
