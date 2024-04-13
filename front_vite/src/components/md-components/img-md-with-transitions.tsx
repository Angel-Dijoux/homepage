import React, { Suspense } from "react";
import { SkeletonImage } from "../skeletons/SkeletonImage";
import { SuspenseImage } from "@/lib/SuspenseImage/SuspenseImage";
import { motion } from "framer-motion";

export function ImgMdWithTransitions(
  props: Readonly<React.ImgHTMLAttributes<HTMLImageElement>>
) {
  return (
    <Suspense fallback={<SkeletonImage />}>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SuspenseImage
          className="rounded-md border w-8/12 h-full ml-4 object-cover"
          loading="lazy"
          decoding="async"
          {...props}
        />
      </motion.div>
    </Suspense>
  );
}
