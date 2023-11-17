"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ContextType, ChildProps, AccountProps } from "@/types";

export const Context = createContext<ContextType | null>(null);

const GlobalContext = ({ children }: ChildProps) => {
  const [account, setAccount] = useState<AccountProps | null>(null);
  const [pageLoader, setPageLoader] = useState(true)

  useEffect(() => {
    const storedAccount = sessionStorage.getItem("account");
    if (storedAccount !== null) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  return (
    <Context.Provider value={{ account, setAccount, pageLoader, setPageLoader }}>
      {children}
    </Context.Provider>
  );
};

export default GlobalContext;

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useGlobalContext must be used within a GlobalContext");
  }
  return context;
};
