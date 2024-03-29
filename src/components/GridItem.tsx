import { PropsWithChildren } from "react";
import { Img } from "react-image";
import { Link } from "react-router-dom";
import Typography from "./ui/Typography";
import { Button } from "./ui/button";

type GridItemProps = {
  href: string;
  title: string;
  thumbnail: string;
};

type WorkGridItemProps = {
  id: number;
  category?: string;
} & Omit<GridItemProps, "href">;

export const GridItem = ({
  href,
  title,
  thumbnail,
  children,
}: Readonly<PropsWithChildren<GridItemProps>>) => (
  <div className="w-full text-center">
    <Link to="href">
      <Img
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        loading="lazy"
      />
      <Link to={href} target="_blank">
        <Button variant="link" className="p-0 m-0 text-base">
          <Typography className="mt-2" variant="p">
            {title}
          </Typography>
        </Button>
      </Link>
      <Typography className="text-sm" variant="p">
        {children}
      </Typography>
    </Link>
  </div>
);

export const WorkGridItem = ({
  children,
  category = "works",
  id,
  title,
  thumbnail,
}: Readonly<PropsWithChildren<WorkGridItemProps>>) => (
  <Link to={`/${category}/${id}`}>
    <div className="w-full text-center border bg-radial-highlight-light dark:bg-radial-highlight-dark rounded-xl py-4 px-3">
      <Img src={thumbnail} alt={title} className=" rounded-xl" loading="lazy" />
      <Link to={`/${category}/${id}`} target="_blank">
        <Button variant="link" className="p-0 m-0 text-base">
          <Typography className="mt-2 text-lg" variant="p">
            {title}
          </Typography>
        </Button>
      </Link>
      {children}
    </div>
  </Link>
);
