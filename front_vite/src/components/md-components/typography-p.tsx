import { PropsWithChildren } from "react";
import Typography from "../ui/Typography";

export function TypographyP({ children }: Readonly<PropsWithChildren>) {
  return (
    <Typography variant="p" className="mt-4">
      {children}
    </Typography>
  );
}
