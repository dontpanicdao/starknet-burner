import { createContext, useContext, useState } from "react";

export const UNINITIALIZED = "UNINITIALIZED";
export const INITIALIZED = "INITIALIZED";
export const CONNECTED = "CONNECTED";

const Context = createContext();

export const StateProvider = ({ children }) => {
  const [state, setState] = useState(UNINITIALIZED);
  const [key, setKey] = useState(null);
  return (
    <Context.Provider value={[state, setState, key, setKey]}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
