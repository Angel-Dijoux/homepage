import { PropsWithChildren } from "react";
import { Img } from "react-image";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Markdown from "react-markdown";

type GridItemProps = {
  href: string;
  title: string;
  thumbnail: string;
};

type WorkGridItemProps = {
  id: number;
  category?: string;
} & Omit<GridItemProps, "href">;

export const WorkGridItem = ({
  children,
  category = "works",
  id,
  title,
  thumbnail,
}: Readonly<PropsWithChildren<WorkGridItemProps>>) => (
  <Link to={`/${category}/${id}`}>
    <div className="w-full text-center border bg-radial-highlight-light dark:bg-radial-highlight-dark rounded-2xl py-3 px-3">
      <Img
        src={thumbnail}
        alt={title}
        className="rounded-xl border"
        loading="lazy"
      />
      <Link to={`/${category}/${id}`} target="_blank">
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
