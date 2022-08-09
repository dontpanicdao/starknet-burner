export const getModalWrapper = (
  container: HTMLDivElement
): HTMLDivElement | null => {
  const modalWrapper =
    container.querySelector<HTMLDivElement>("#modal-wrapper");
  return modalWrapper;
};
