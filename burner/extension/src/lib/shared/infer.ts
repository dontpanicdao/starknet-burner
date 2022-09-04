import { waitForMessage } from "./message";

export const send = async (): Promise<boolean | undefined> => {
  return await waitForMessage("keyring_Debug", "777");
};
