import { describe, expect, it, jest } from "@jest/globals";
jest.mock("./message");
import { send } from "./infer";

describe("waitForMessage", () => {
  it("check the returned message type", async () => {
    const v = await send();
    expect(v).toBe(true);
  });
});
