import { Container } from "@chakra-ui/react";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighterRenderer } from "react-syntax-highlighter";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

export interface MarkdownContainerProps {
  conteudo: string;
}

export default function MarkdownContainer(props: MarkdownContainerProps) {
  const { conteudo } = props;

  const renderers = {
    ...ChakraUIRenderer(),
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighterRenderer language={match[1]} {...props}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighterRenderer>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <Container>
      <ReactMarkdown components={renderers} skipHtml>
        {conteudo}
      </ReactMarkdown>
    </Container>
  );
}
