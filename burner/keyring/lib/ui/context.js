import { createContext, useContext, useState } from "react";

export const UNINITIALIZED = "UNINITIALIZED";
export const INITIALIZED = "INITIALIZED";
export const CONNECTED = "CONNECTED";

const Context = createContext();

export const StateProvider = ({ children }) => {
  const [key, setKey] = useState("");
  const [modalProperties, setModalProperties] = useState({ usePin: true, tokenId: "0xdeadbeef" }); // TODO remove default values
  const [state, setState] = useState(UNINITIALIZED);
  return (
    <Context.Provider
      value={{
        state,
        setState,
        key,
        setKey,
        modalProperties,
        setModalProperties,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
