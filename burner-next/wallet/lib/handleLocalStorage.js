import { notify } from "./extension/message";

const getLocalStorage = (keyName) => {
  return localStorage.getItem(keyName);
};

const saveLocalStorage = (keyName, value) => {
  return localStorage.setItem(keyName, value);
};

const removeLocalStorage = () => {
  return localStorage.clear();
};

export { getLocalStorage, saveLocalStorage, removeLocalStorage };
