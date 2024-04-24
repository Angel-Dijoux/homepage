import { SuspenseImage } from "@/lib/SuspenseImage/SuspenseImage";
import { Link } from "@tanstack/react-router";
import { PropsWithChildren, Suspense } from "react";
import { MarkdownWrapper } from "./MarkdownWrapper";
import { SkeletonImage } from "./skeletons/SkeletonImage";
import { Button } from "./ui/button";

type GridItemProps = {
  href: string;
  title: string;
  thumbnail: string;
};

type WorkGridItemProps = {
  id: string;
} & Omit<GridItemProps, "href">;

export const WorkGridItem = ({
  children,
  id,
  title,
  thumbnail,
}: Readonly<PropsWithChildren<WorkGridItemProps>>) => {
  return (
    <Link to="/works/$id" params={{ id: id }}>
      <div className="w-full min-h-80 text-center border bg-radial-highlight-light dark:bg-radial-highlight-dark rounded-md py-2 px-2">
        <div className="h-36 w-full">
          <Suspense fallback={<SkeletonImage />}>
            <SuspenseImage
              src={thumbnail}
              alt={title}
              className="rounded-md border object-cover w-full h-full"
              loading="lazy"
              decoding="async"
            />
          </Suspense>
        </div>

        <Link to="/works/$id" params={{ id: id }}>
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
