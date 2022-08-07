export const isMatchMoreThanPx = (size: number): boolean => {
  return window.matchMedia(`(min-width: ${size}px)`).matches;
};
