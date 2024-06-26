import { PropsWithChildren } from "react";
import Typography from "../ui/Typography";

export function TypographyH1({ children }: Readonly<PropsWithChildren>) {
  return (
    <Typography variant="h1" className="mt-4">
      {children}
    </Typography>
  );
}
