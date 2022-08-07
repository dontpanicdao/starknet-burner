const sessionData = {};

const getLocalStorage = (keyName) => {
  try {
    return sessionStorage.getItem(keyName);
  } catch (e) {
    console.log("sessionStorage unavailable, working with variable");
    return sessionData?.[keyName];
  }
};

const saveLocalStorage = (keyName, value) => {
  try {
    return sessionStorage.setItem(keyName, value);
  } catch (e) {
    console.log("sessionStorage unavailable, working with variable");
    return (sessionData[keyName] = value);
  }
};

const removeLocalStorage = () => {
  try {
    return sessionStorage.clear();
  } catch (e) {
    console.log("sessionStorage unavailable, working with variable");
    for (const keyName of sessionData) {
      delete sessionData?.[keyName];
    }
  }
};

export { getLocalStorage, saveLocalStorage, removeLocalStorage };
