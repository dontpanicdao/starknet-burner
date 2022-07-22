export const iFrame = (element: HTMLIFrameElement) => {
  element.addEventListener("load", function () {
    console.log("wallet loaded...");
  });
  element.src = `${import.meta.env.VITE_WALLET_URL || "http://localhost:3000"}`;
};

export const attach = () => {
  try {
    window.__BURNER = {
      sayHi: () => {
        console.log("Hi from burner2");
      },
    };
  } catch {
    // ignore
  }
};

export const attachHandler = () => {
  attach();
  setTimeout(attach, 1000);
};

attachHandler();
