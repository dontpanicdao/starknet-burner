import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { setDebug, log } from "./log";

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(jest.fn());
});

describe("test log and debug", () => {
  it("check console.log is called when debug is true", () => {
    setDebug(true);
    const spy = jest.spyOn(global.console, "log");
    log("123");
    expect(spy).toHaveBeenCalled();
  });

  it("check console.log is not called when debug is false", () => {
    setDebug(false);
    const spy = jest.spyOn(global.console, "log");
    log("123");
    expect(spy).not.toHaveBeenCalled();
  });
});
