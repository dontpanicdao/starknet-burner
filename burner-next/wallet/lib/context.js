import { createContext, useContext, useState } from "react";

const Context = createContext();

const StateProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [key, setKey] = useState(null);
  return (
    <Context.Provider value={[state, setState, key, setKey]}>
      {children}
    </Context.Provider>
  );
};

const useStateContext = () => {
  return useContext(Context);
};

export { StateProvider, useStateContext };
