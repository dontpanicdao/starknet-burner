import { jest, describe, expect, it, beforeAll } from "@jest/globals";
jest.mock("./shared/message");
jest.mock("../components/iframe");
jest.mock("../components/modal");
import {
  keyringPing,
  keyringClearDebug,
  keyringSetDebug,
  keyringOpenModal,
  keyringCloseModal,
  keyringCheckStatus,
  keyringResetSessionKey,
  keyringWaitForCloseModal,
} from "./keyring";

describe("keyring", () => {
  it("check keyringPing function", async () => {
    const output = await keyringPing("ough");
    expect(output).toBe("ough");
  });

  it("check keyringSetDebug function", async () => {
    const debug = await keyringSetDebug();
    expect(debug).toBe(true);
  });

  it("check keyringClearDebug function", async () => {
    const debug = await keyringClearDebug();
    expect(debug).toBe(true);
  });

  it("check keyringOpenModal function", async () => {
    const debug = await keyringOpenModal();
    expect(debug).toBe(undefined);
  });

  it("check keyringCloseModal function", async () => {
    const debug = await keyringCloseModal();
    expect(debug).toBe(undefined);
  });

  it("check keyringCheckStatus function", async () => {
    const config = await keyringCheckStatus();
    expect(config?.addresses).toBeDefined();
    expect(config?.connected).toBe(true);
    expect(config?.addresses[0]).toBe("0x7");
  });

  it("check keyringResetSessionKey function", async () => {
    const config = await keyringResetSessionKey();
    expect(config?.connected).toBe(false);
    expect(config?.addresses).not.toBeDefined();
  });

  it("check keyringWaitForCloseModal function", async () => {
    const config = await keyringWaitForCloseModal();
    expect(config).not.toBeDefined();
  });
});
