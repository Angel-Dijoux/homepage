import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import React, {
  type ForwardedRef,
  HTMLAttributes,
  type PropsWithChildren,
} from "react";

type StyledDivProps = React.HTMLProps<HTMLDivElement> & MotionProps;

const StyledDiv = React.forwardRef(
  ({ ...rest }: StyledDivProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <motion.div {...rest} ref={ref} />;
  },
);

type SectionProps = {
  delay?: number;
} & HTMLAttributes<"section">;

export function Section({
  className,
  children,
  delay = 0,
}: PropsWithChildren<SectionProps>) {
  return (
    <StyledDiv
      className={cn("mt-6", className)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </StyledDiv>
  );
}
