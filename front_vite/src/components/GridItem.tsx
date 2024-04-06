import { SuspenseImage } from "@/lib/SuspenseImage/SuspenseImage";
import { Link } from "@tanstack/react-router";
import { PropsWithChildren, Suspense } from "react";
import { SkeletonImage } from "./skeletons/SkeletonImage";
import { Button } from "./ui/button";
import { MarkdownWrapper } from "./MarkdownWrapper";

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
      <div className="w-full min-h-80 text-center border bg-radial-highlight-light dark:bg-radial-highlight-dark rounded-md py-2 px-2">
        <Suspense fallback={<SkeletonImage />}>
          <SuspenseImage
            src={thumbnail}
            alt={title}
            className="rounded-md border w-full h-full"
            loading="lazy"
            decoding="async"
          />
        </Suspense>

        <Link to="/works/$id" params={{ id: String(id) }}>
          <Button variant="link" className="p-0 m-0 text-base mt-4">
            <div className="mt-2 text-lg">
              <MarkdownWrapper
                content={title}
                className="whitespace-pre-line"
              />
            </div>
          </Button>
        </Link>
        <div className="py-4">{children}</div>
      </div>
    </Link>
  );
};
