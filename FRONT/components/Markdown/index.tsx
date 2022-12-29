import { Container } from "@chakra-ui/react";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export interface MarkdownContainerProps {
  content: string;
}

export default function MarkdownContainer(props: MarkdownContainerProps) {
  const { content } = props;

  return (
    <Container>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, style, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <SyntaxHighlighter language={match[1]} {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
        skipHtml
      >
        {content}
      </ReactMarkdown>
    </Container>
  );
}
