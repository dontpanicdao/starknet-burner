export enum level {
  DEBUG = 0,
  INFO,
  WARN,
  ERROR,
}

export enum module {
  DEFAULT = "DEFAULT",
  PING = "PING",
  KEYRING = "KEYRING",
}

const debugLevel: Record<module, level> = {
  DEFAULT: level.INFO,
  PING: level.INFO,
  KEYRING: level.INFO,
};

export const setDebug = (on: boolean | Record<module, level> = true) => {
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

const logWithLevel = (l: level, m: module, ...args: any[]): void => {
  if (l >= debugLevel[m]) {
    console.log("in:extension", ...args);
  }
};

type logger = {
  _module: module;
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
};

export const newLog = (m: module = module.DEFAULT): logger => {
  const log = {
    _module: m,
    log: (...args: any[]) => {
      logWithLevel(level.INFO, log._module, ...args);
    },
    warn: (...args: any[]) => {
      logWithLevel(level.WARN, log._module, ...args);
    },
    error: (...args: any[]) => {
      logWithLevel(level.ERROR, log._module, ...args);
    },
    debug: (...args: any[]) => {
      logWithLevel(level.DEBUG, log._module, ...args);
    },
  };
  return log;
};
