export const level = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

export const module = {
  DEFAULT: "DEFAULT",
  PING: "PING",
  KEYRING: "KEYRING",
};

const debugLevel = {
  DEFAULT: process.env.NODE_ENV === "development" ? level.DEBUG : level.INFO,
  PING: process.env.NODE_ENV === "development" ? level.DEBUG : level.INFO,
  KEYRING: process.env.NODE_ENV === "development" ? level.DEBUG : level.INFO,
};

export const setDebug = (on = true) => {
  if (typeof on === "boolean") {
    let mode = level.INFO;
    if (on) {
      mode = level.DEBUG;
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

const logWithLevel = (l, m, ...args) => {
  if (l >= debugLevel[m]) {
    console.log("in:keyring", ...args);
  }
};

export const newLog = (m = module.DEFAULT) => {
  const log = {
    _module: m,
    log: (...args) => {
      logWithLevel(level.INFO, log._module, ...args);
    },
    warn: (...args) => {
      logWithLevel(level.WARN, log._module, ...args);
    },
    error: (...args) => {
      logWithLevel(level.ERROR, log._module, ...args);
    },
    debug: (...args) => {
      logWithLevel(level.DEBUG, log._module, ...args);
    },
  };
  return log;
};
