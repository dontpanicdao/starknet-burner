import {
  setDebug,
  newLog,
  logModuleKEYRING,
  logLevelINFO,
  logLevelERROR,
  logLevelDEBUG,
} from "./log";

beforeAll(() => {
  jest.spyOn(console, "debug").mockImplementation(jest.fn());
  jest.spyOn(console, "log").mockImplementation(jest.fn());
  jest.spyOn(console, "warn").mockImplementation(jest.fn());
  jest.spyOn(console, "error").mockImplementation(jest.fn());
});

describe("test log and debug", () => {
  it("check console.log is called when debug is true", () => {
    setDebug(true);
    const spy = jest.spyOn(global.console, "debug");
    const log = newLog();
    log.debug("123");
    expect(spy).toHaveBeenCalled();
  });

  it("check console.log is not called when debug is false", () => {
    setDebug(false);
    const spy = jest.spyOn(global.console, "debug");
    const log = newLog();
    log.debug("123");
    expect(spy).not.toHaveBeenCalled();
  });

  it("check console.log is called/not called when debug a Record", () => {
    const levels = {
      PING: logLevelINFO,
      KEYRING: logLevelDEBUG,
      DEFAULT: logLevelINFO,
    };
    setDebug(levels);
    const spy = jest.spyOn(global.console, "debug");
    const logDefault = newLog();
    logDefault.debug("123");
    expect(spy).not.toHaveBeenCalled();
    const logKeyring = newLog(logModuleKEYRING);
    logKeyring.debug("123");
    expect(spy).toHaveBeenCalled();
  });

  it("check console.log when logLevel is ERROR", () => {
    const levels = {
      PING: logLevelDEBUG,
      KEYRING: logLevelDEBUG,
      DEFAULT: logLevelERROR,
    };
    setDebug(levels);
    const spyDebug = jest.spyOn(global.console, "debug");
    const spyLog = jest.spyOn(global.console, "log");
    const spyWarn = jest.spyOn(global.console, "warn");
    const spyError = jest.spyOn(global.console, "error");
    const logDefault = newLog();
    logDefault.debug("123");
    expect(spyDebug).not.toHaveBeenCalled();
    logDefault.log("123");
    expect(spyLog).not.toHaveBeenCalled();
    logDefault.warn("123");
    expect(spyWarn).not.toHaveBeenCalled();
    logDefault.error("123");
    expect(spyError).toHaveBeenCalled();
  });
});
