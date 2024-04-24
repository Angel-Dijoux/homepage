import { cn } from "@/lib/utils";
import React from "react";
import Typography, { TypographyProps, typographyVariants } from "./Typography";

const SectionTitle = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, affects, ...props }, ref) => {
    return (
      <Typography
        ref={ref}
        className={cn(
          "underline text-lg underline-offset-4 decoration-muted-foreground decoration-4 mt-3 mb-4",
          cn(typographyVariants({ variant, affects, className })),
        )}
        {...props}
      />
    );
  },
);
SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
