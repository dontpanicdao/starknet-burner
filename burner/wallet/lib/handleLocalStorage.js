const sessionData = {};

const getLocalStorage = (keyName) => {
  try {
    return sessionStorage.getItem(keyName);
  } catch (e) {
    return sessionData[keyName];
  }
};

const saveLocalStorage = (keyName, value) => {
  try {
    return sessionStorage.setItem(keyName, value);
  } catch (e) {
    console.log("sessionStorage unavailable, working with variable");
    sessionData[keyName] = value;
    return;
  }
};

const removeLocalStorage = () => {
  try {
    return sessionStorage.clear();
  } catch (e) {
    for (const keyName of sessionData) {
      delete sessionData[keyName];
    }
  }
};

export { getLocalStorage, saveLocalStorage, removeLocalStorage };
