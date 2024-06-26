import { PropsWithChildren } from "react";
import Typography from "../ui/Typography";

export function TypographyH3({ children }: Readonly<PropsWithChildren>) {
  return (
    <Typography variant="h3" className="mt-4">
      {children}
    </Typography>
  );
}
