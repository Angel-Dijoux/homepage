import { SuspenseImage } from "@/lib/SuspenseImage/SuspenseImage";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
import { SkeletonImage } from "../skeletons/SkeletonImage";

function imageIsLandscape(source: string) {
  const img = new Image();
  img.src = source;
  return img.width > img.height;
}

export function ImgMdWithTransitions(
  props: Readonly<React.ImgHTMLAttributes<HTMLImageElement>>,
) {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);

  useEffect(() => {
    if (!props.src) {
      throw new Error("Set image before check the size.");
    }
    const isLandscape = imageIsLandscape(props.src);
    setIsLandscape(isLandscape);
  }, [props.src]);

  return (
    <Suspense fallback={<SkeletonImage />}>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SuspenseImage
          className={cn(
            "rounded-md border h-full mx-2 my-8 object-cover",
            isLandscape ? "w-full" : "w-8/12",
          )}
          loading="lazy"
          decoding="async"
          {...props}
        />
      </motion.div>
    </Suspense>
  );
}
