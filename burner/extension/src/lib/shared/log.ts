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
  PROVIDER3X = "PROVIDER3X",
  ACCOUNT3X = "ACCOUNT3X",
}

const debugLevel: Record<module, level> = {
  DEFAULT: import.meta.env.DEV ? level.DEBUG : level.INFO,
  PING: import.meta.env.DEV ? level.DEBUG : level.INFO,
  KEYRING: import.meta.env.DEV ? level.DEBUG : level.INFO,
  PROVIDER3X: import.meta.env.DEV ? level.DEBUG : level.INFO,
  ACCOUNT3X: import.meta.env.DEV ? level.DEBUG : level.INFO,
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

const logWithLevel = (
  writer: (...data: any[]) => void,
  l: level,
  m: module,
  ...args: any[]
): void => {
  if (l >= debugLevel[m]) {
    writer("in:extension", ...args);
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
      logWithLevel(console.log, level.INFO, log._module, ...args);
    },
    warn: (...args: any[]) => {
      logWithLevel(console.warn, level.WARN, log._module, ...args);
    },
    error: (...args: any[]) => {
      logWithLevel(console.error, level.ERROR, log._module, ...args);
    },
    debug: (...args: any[]) => {
      logWithLevel(console.debug, level.DEBUG, log._module, ...args);
    },
  };
  return log;
};
