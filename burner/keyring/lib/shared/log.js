export const logLevelDEBUG = 0;
export const logLevelINFO = 1;
export const logLevelWARN = 2;
export const logLevelERROR = 3;

export const logModuleDEFAULT = "DEFAULT";
export const logModulePING = "PING";
export const logModuleKEYRING = "KEYRING";
export const logModuleACCOUNT3X = "ACCOUNT3X";
export const logModulePROVIDER3X = "PROVIDER3X";

const debugLevel = {
  DEFAULT:
    process.env.NODE_ENV === "development" ? logLevelDEBUG : logLevelINFO,
  PING: process.env.NODE_ENV === "development" ? logLevelDEBUG : logLevelINFO,
  KEYRING:
    process.env.NODE_ENV === "development" ? logLevelDEBUG : logLevelINFO,
  ACCOUNT3X:
    process.env.NODE_ENV === "development" ? logLevelDEBUG : logLevelINFO,
  PROVIDER3X:
    process.env.NODE_ENV === "development" ? logLevelDEBUG : logLevelINFO,
};

export const setDebug = (on = true) => {
  if (typeof on === "boolean") {
    let mode = logLevelINFO;
    if (on) {
      mode = logLevelDEBUG;
    }
    for (let prop in debugLevel) {
      debugLevel[prop] = mode;
    }
    return;
  }
  for (let prop in on) {
    debugLevel[prop] = on[prop];
  }
};

const logWithLevel = (writer, l, m, ...args) => {
  if (l >= debugLevel[m]) {
    writer("in:keyring", ...args);
  }
};

export const newLog = (m = logModuleDEFAULT) => {
  const log = {
    _module: m,
    debug: (...args) => {
      logWithLevel(console.log, logLevelDEBUG, log._module, ...args);
    },
    log: (...args) => {
      logWithLevel(console.log, logLevelINFO, log._module, ...args);
    },
    warn: (...args) => {
      logWithLevel(console.warn, logLevelWARN, log._module, ...args);
    },
    error: (...args) => {
      logWithLevel(console.error, logLevelERROR, log._module, ...args);
    },
  };
  return log;
};
