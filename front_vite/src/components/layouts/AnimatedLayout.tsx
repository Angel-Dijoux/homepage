import { motion, type Variants } from "framer-motion";
import { type PropsWithChildren } from "react";
import { Helmet } from "react-helmet";

const variants: Variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
};

type LayoutProps = {
  title?: string;
  imgSrc?: string;
};

export const AnimatedLayout = ({
  children,
  title,
  imgSrc,
}: PropsWithChildren<LayoutProps>) => {
  const t = title ? `${title} - Angel Dijoux` : "Angel Dijoux";
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: "easeInOut" }}
      style={{ position: "relative", marginBottom: 24 }}
    >
      {title
        ? (
          <Helmet>
            <title>{t}</title>
            <meta name="twitter:title" content={t} />
            <meta property="og:title" content={t} />
            {imgSrc ? <meta name="twitter:image" content={imgSrc} /> : null}
            {imgSrc ? <meta property="og:image" content={imgSrc} /> : null}
          </Helmet>
        )
        : null}
      {children}
    </motion.article>
  );
};
