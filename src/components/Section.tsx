import React, { type ForwardedRef, type PropsWithChildren } from "react";
import { motion, MotionProps } from "framer-motion";

type StyledDivProps = React.HTMLProps<HTMLDivElement> & MotionProps;

const StyledDiv = React.forwardRef(
  ({ ...rest }: StyledDivProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <motion.div {...rest} ref={ref} />;
  }
);

type SectionProps = {
  delay?: number;
};

export function Section({
  children,
  delay = 0,
}: PropsWithChildren<SectionProps>) {
  return (
    <StyledDiv
      className="mb-6"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </StyledDiv>
  );
}
