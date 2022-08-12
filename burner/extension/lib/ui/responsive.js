const isMatchMoreThanPx = (size) => {
  return window.matchMedia(`(min-width: ${size}px)`).matches;
};

export { isMatchMoreThanPx };
