import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { KanbanContextProvider, AuthContextProvider } from "@/contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <KanbanContextProvider>
          <Component {...pageProps} />
        </KanbanContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
