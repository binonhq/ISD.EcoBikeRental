import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const RentContext = createContext({});

export function RentContextProvider({ children }) {
  const [rent, setRent] = useState("");
  return (
    <RentContext.Provider value={{ rent, setRent }}>
      {children}
    </RentContext.Provider>
  );
}
