import { createContext, useContext, useState } from "react";

const Context = createContext();

const StateProvider = ({ children }) => {
  const [state, setState] = useState(null);
  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

const useStateContext = () => {
  return useContext(Context);
};

export { StateProvider, useStateContext };
