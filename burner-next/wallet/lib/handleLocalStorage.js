const isLocalStorage = (keyName) => {
  return localStorage.getItem(keyName) ? true : false;
};

const saveInLocalStorage = (keyName, value) => {
  return localStorage.setItem(keyName, value);
};

export { isLocalStorage, saveInLocalStorage };
