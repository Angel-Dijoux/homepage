import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMermaid from "remark-mermaidjs";
import rehypeRaw from "rehype-raw";

type MarkdownWrapperProps = {
  content?: string;
  textOnly?: boolean;
};

export function MarkdownWrapper({
  content,
  textOnly = true,
}: Readonly<MarkdownWrapperProps>) {
  const textOnlyRemarks = [remarkGfm];

  return (
    <Markdown
      // @ts-expect-error Type not supported yet.
      remarkPlugins={
        textOnly ? textOnlyRemarks : [...textOnlyRemarks, [remarkMermaid]]
      }
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
    >
      {content}
    </Markdown>
  );
}
