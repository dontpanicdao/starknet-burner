export const Button = (element: HTMLButtonElement) => {
  element.addEventListener("click", function () {
    const iframe = document.querySelector<HTMLIFrameElement>("#iframe");
    const inputText = document.querySelector<HTMLInputElement>("#value");
    iframe?.contentWindow?.postMessage(
      JSON.stringify({ name: "send", value: inputText?.value }),
      "http://localhost:3000"
    );
  });
};
