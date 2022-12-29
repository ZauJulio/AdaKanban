import { ReactNode, useState, createContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

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

  const toast = useToast();

  useEffect(() => {
    async function fetchToken() {
      try {
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
      } catch (error) {
        toast({
          title: "Erro ao tentar se conectar com o servidor",
          description: "Tente novamente mais tarde",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
    fetchToken();

    return () => setToken(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
