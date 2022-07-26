export {};

declare global {
  interface Window {
    __BURNER: {
      sayHi: () => void;
    };
  }
}
