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
};

export const AnimatedLayout = ({
  children,
  title,
}: PropsWithChildren<LayoutProps>) => {
  const t = title ? `${title} - Angel Dijoux` : "Angel Dijoux";
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: "easeInOut" }}
      style={{ position: "relative" }}
    >
      {title && (
        <Helmet>
          <title>{t}</title>
          <meta name="twitter:title" content={t} />
          <meta property="og:title" content={t} />
        </Helmet>
      )}
      {children}
    </motion.article>
  );
};
