import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { ExtraProps } from "react-markdown";

type LinkWithButtonProps = React.ClassAttributes<HTMLAnchorElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  ExtraProps;

export const LinkWithButton = ({
  href,
  children,
}: Readonly<PropsWithChildren<LinkWithButtonProps>>) => {
  if (href && /^https?:\/\//.test(href)) {
    const imageBadgeRegex = /\.(jpeg|jpg|gif|png|svg)$/;
    const match = imageBadgeRegex.exec(href);
    if (!match) {
      return (
        <a href={href}>
          <Button variant="link" className="p-0 m-0 text-base">
            {children}
          </Button>
        </a>
      );
    }
  }
  return <a href={href}>{children}</a>;
};
