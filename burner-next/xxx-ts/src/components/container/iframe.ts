import { hiddenStyle } from "../../lib/ui/styles";

export const getIFrame = (
  container: HTMLDivElement
): HTMLIFrameElement | null => {
  const iFrame = container.querySelector<HTMLIFrameElement>("#iframe");
  if (!iFrame) {
    return null;
  }
  iFrame.style.cssText = hiddenStyle;
  iFrame.addEventListener("load", () => {
    console.log("wallet loaded...");
  });
  iFrame.src =
    import.meta.env?.VITE_WALLET_URL || "https://starknet-burner.vercel.app";
  return iFrame;
};
