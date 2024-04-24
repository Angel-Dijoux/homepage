import { PropsWithChildren } from "react";
import { ExtraProps } from "react-markdown";
import { Button } from "../ui/button";

type LinkWithButtonProps =
  & React.ClassAttributes<HTMLAnchorElement>
  & React.AnchorHTMLAttributes<HTMLAnchorElement>
  & ExtraProps;

export const LinkWithButton = ({
  href,
  children,
}: Readonly<PropsWithChildren<LinkWithButtonProps>>) => {
  if (href && /^https?:\/\//.test(href)) {
    const imageBadgeRegex = /\.(jpeg|jpg|gif|png|svg)$/;
    const match = imageBadgeRegex.exec(href);
    if (!match) {
      return (
        <a href={href} target="_blank">
          <Button
            variant="link"
            className="p-0 m-0 text-base whitespace-pre-line text-start"
          >
            {children}
          </Button>
        </a>
      );
    }
  }
  return <a href={href}>{children}</a>;
};
