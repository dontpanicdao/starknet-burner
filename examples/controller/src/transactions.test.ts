import { describe, expect, it } from "vitest";
import { calculateTransactionHashCommon } from "starknet/utils/hash";
import { TransactionHashPrefix, StarknetChainId } from "starknet/constants";

describe("compute transaction", () => {
  it("should match the transaction", () => {
    const result = calculateTransactionHashCommon(
      TransactionHashPrefix.INVOKE,
      "0x0",
      "0x019e63006d7df131737f5222283da28de2d9e2f0ee92fdc4c4c712d1659826b0",
      "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
      [
        "0x1",
        "0x37a2490365294ef4bc896238642b9bcb0203f86e663f11688bb86c5e803c167",
        "0x7a44dde9fea32737a5cf3f9683b3235138654aa2d189f6fe44af37a61dc60d",
        "0x0",
        "0x0",
        "0x0",
        "0x2",
      ],
      "0x200000000",
      StarknetChainId.TESTNET
    );
    expect(result).toBe(
      "0x6afcb2752d23d922355a857c5cac1fa0f16b8fd8906c60460579453953c48b4"
    );
  });
});
