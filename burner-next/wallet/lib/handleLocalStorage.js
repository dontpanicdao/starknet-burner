const getLocalStorage = (keyName) => {
  return localStorage.getItem(keyName);
};

const saveLocalStorage = (keyName, value) => {
  return localStorage.setItem(keyName, value);
};

export { getLocalStorage, saveLocalStorage };
