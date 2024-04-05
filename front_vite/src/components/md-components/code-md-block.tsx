import { PropsWithChildren, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../ThemeProvider";
import { ButtonWithIcon } from "../ui/ButtonWithIcon";
import { CopyIcon } from "@radix-ui/react-icons";

async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

type CodeMdBlockProps = {
  className?: string;
  inline?: boolean;
};

export function CodeMdBlock({
  children,
  className,
  inline,
}: Readonly<PropsWithChildren<CodeMdBlockProps>>) {
  const { theme } = useTheme();
  const [showCopyButton, setShowCopyButton] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await copyTextToClipboard(String(children).replace(/\n$/, ""));
      setShowCopyButton(false);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const match = /language-(\w+)/.exec(className ?? "");
  return (
    <div
      className="relative"
      onMouseEnter={() =>
        !inline && match ? setShowCopyButton((prev) => !prev) : null
      }
      onMouseLeave={() =>
        !inline && match ? setShowCopyButton((prev) => !prev) : null
      }
      role="button"
      tabIndex={0}
    >
      {!inline && match ? (
        <div>
          <SyntaxHighlighter
            language={match[1]}
            style={theme == "dark" ? oneDark : oneLight}
            showLineNumbers
            wrapLines
            showInlineLineNumbers
            wrapLongLines
            PreTag="div"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          {showCopyButton && (
            <ButtonWithIcon
              IconLeft={<CopyIcon width={ICON_SIZE} height={ICON_SIZE} />}
              className="absolute top-0 right-0 z-10 px-2 py-1 m-4"
              onClick={handleCopy}
            />
          )}
        </div>
      ) : (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {children}
        </code>
      )}
    </div>
  );
}

const ICON_SIZE = 18;
