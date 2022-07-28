import { useState, useEffect } from "react";

const usePersistentState = (key) => {
  const [value, setValue] = useState(null);

  const setValueAndPersist = (newValue) => {
    if (newValue !== value) {
      setValue(newValue);
      return localStorage.setItem(key, newValue);
    }
    return value;
  };

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      setValue(item);
    }
  }, []);

  return [value, setValueAndPersist];
};

export { usePersistentState };
