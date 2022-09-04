import { describe, expect, it } from "@jest/globals";
import { shortTimeoutMilliseconds, uuid } from "./config";

describe("test configuration", () => {
  it("check const are not changed", () => {
    expect(uuid).toBe("589c80c1eb85413d");
    expect(shortTimeoutMilliseconds).toBe(30000);
  });
});
