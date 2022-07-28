const isLocalStorage = (keyName) => {
  return localStorage.getItem(keyName) ? true : false;
};

export { isLocalStorage };
