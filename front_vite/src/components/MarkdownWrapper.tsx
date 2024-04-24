import Markdown, { Options } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMermaid from "remark-mermaidjs";
import { CodeMdBlock } from "./md-components/code-md-block";
import { ImgMdWithTransitions } from "./md-components/img-md-with-transitions";
import { LinkWithButton } from "./md-components/link-with-button";
import { TypographyH1 } from "./md-components/typography-1";
import { TypographyH2 } from "./md-components/typography-2";
import { TypographyH3 } from "./md-components/typography-3";
import { TypographyH4 } from "./md-components/typography-4";
import { TypographyP } from "./md-components/typography-p";
import { TypographyBlockquote } from "./ui/TypographyBlockquote";

type MarkdownWrapperProps = {
  content?: string;
  textOnly?: boolean;
} & Options;

export function MarkdownWrapper({
  className,
  content,
  textOnly = true,
}: Readonly<MarkdownWrapperProps>) {
  const textOnlyRemarks = [remarkGfm];

  return (
    <div className="md-container">
      <Markdown
        // @ts-expect-error Type not supported yet.
        remarkPlugins={textOnly
          ? textOnlyRemarks
          : [...textOnlyRemarks, [remarkMermaid]]}
        rehypePlugins={[rehypeHighlight]}
        className={className}
        components={{
          code: CodeMdBlock,
          h1: TypographyH1,
          h2: TypographyH2,
          h3: TypographyH3,
          h4: TypographyH4,
          p: TypographyP,
          a: LinkWithButton,
          blockquote: TypographyBlockquote,
          img: ImgMdWithTransitions,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
