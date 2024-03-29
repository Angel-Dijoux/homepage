import React from "react";
import { cn } from "@/lib/utils";
import Typography, { TypographyProps, typographyVariants } from "./Typography";

const SectionTitle = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, affects, ...props }, ref) => {
    return (
      <Typography
        ref={ref}
        className={cn(
          "underline text-lg underline-offset-4 decoration-slate-800 decoration-4 mt-3 mb-4",
          cn(typographyVariants({ variant, affects, className }))
        )}
        {...props}
      />
    );
  }
);
SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
