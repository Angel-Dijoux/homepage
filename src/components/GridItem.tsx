import { PropsWithChildren } from "react";
import { Img } from "react-image";
import { Button } from "./ui/button";
import Markdown from "react-markdown";
import { Link } from "@tanstack/react-router";

type GridItemProps = {
  href: string;
  title: string;
  thumbnail: string;
};

type WorkGridItemProps = {
  id: number;
} & Omit<GridItemProps, "href">;

export const WorkGridItem = ({
  children,
  id,
  title,
  thumbnail,
}: Readonly<PropsWithChildren<WorkGridItemProps>>) => (
  <Link to="/works/$id" params={{ id: String(id) }}>
    <div className="w-full text-center border bg-radial-highlight-light dark:bg-radial-highlight-dark rounded-2xl py-3 px-3">
      <Img
        src={thumbnail}
        alt={title}
        className="rounded-xl border"
        loading="lazy"
      />
      <Link to="/works/$id" params={{ id: String(id) }}>
        <Button variant="link" className="p-0 m-0 text-base">
          <div className="mt-2 text-lg">
            <Markdown>{title}</Markdown>
          </div>
        </Button>
      </Link>
      {children}
    </div>
  </Link>
);
