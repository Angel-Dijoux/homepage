import React, { PropsWithChildren } from "react";
import { ButtonProps, buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

type ButtomWithIconProps = {
  IconLeft?: JSX.Element;
  IconRight?: JSX.Element;
} & ButtonProps;

const ButtonWithIcon = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtomWithIconProps>
>(
  (
    {
      children,
      className,
      variant,
      size,
      asChild = false,
      IconLeft,
      IconRight,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "flex justify-center items-center gap-2",
          cn(buttonVariants({ variant, size, className }))
        )}
        ref={ref}
        {...props}
      >
        {IconLeft}
        {children}
        {IconRight}
      </Comp>
    );
  }
);
ButtonWithIcon.displayName = "ButtonWithIcon";

export { ButtonWithIcon };
