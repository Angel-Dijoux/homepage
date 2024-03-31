import { SuspenseImage } from "@/lib/SuspenseImage/SuspenseImage";
import { Link } from "@tanstack/react-router";
import { PropsWithChildren, Suspense } from "react";
import Markdown from "react-markdown";
import { SkeletonImage } from "./skeletons/SkeletonImage";
import { Button } from "./ui/button";

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
}: Readonly<PropsWithChildren<WorkGridItemProps>>) => {
  return (
    <Link to="/works/$id" params={{ id: String(id) }}>
      <div className="w-full text-center border bg-radial-highlight-light dark:bg-radial-highlight-dark rounded-2xl py-3 px-3">
        <Suspense fallback={<SkeletonImage />}>
          <SuspenseImage
            src={thumbnail}
            alt={title}
            className="rounded-xl border"
            loading="lazy"
            decoding="async"
          />
        </Suspense>

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
};
