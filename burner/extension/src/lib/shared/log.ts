let debug = false;

export const setDebug = (mode: boolean) => {
  debug = mode;
};

export const log = (...args: any[]) => {
  if (debug) {
    console.log(...args);
  }
};
