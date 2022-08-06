const getLocalStorage = (keyName) => {
  return sessionStorage.getItem(keyName);
};

const saveLocalStorage = (keyName, value) => {
  return sessionStorage.setItem(keyName, value);
};

const removeLocalStorage = () => {
  return sessionStorage.clear();
};

export { getLocalStorage, saveLocalStorage, removeLocalStorage };
