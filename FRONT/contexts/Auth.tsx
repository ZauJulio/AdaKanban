import { ReactNode, useState, createContext, useEffect } from "react";

import { CardType } from "@/types";

export interface IAuthContext {
  token: string | null;
}

export type SelectedCardType = {
  data: CardType;
  index: number;
  parent: string;
};

export const AuthContext = createContext({} as IAuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch(`${process.env.API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: process.env.API_USER,
          senha: process.env.API_PASSWORD,
        }),
      });

      const data = await response.json();

      setToken(data);
    }
    fetchToken();

    return () => {
      setToken(null);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
