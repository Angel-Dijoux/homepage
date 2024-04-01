import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

type MarkdownWrapperProps = {
  content?: string;
};

export function MarkdownWrapper({ content }: Readonly<MarkdownWrapperProps>) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
      {content}
    </Markdown>
  );
}
