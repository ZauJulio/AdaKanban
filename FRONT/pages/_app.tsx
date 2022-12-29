import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme"

import { KanbanContextProvider, AuthContextProvider } from "@/contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <KanbanContextProvider>
          <Component {...pageProps} />
        </KanbanContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
