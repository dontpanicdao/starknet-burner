const generateModal = (container: HTMLDivElement): HTMLDivElement | null => {
  const modal = container.querySelector<HTMLDivElement>("#modal-wrapper");
  return modal;
};

export default generateModal;
