import { PropsWithChildren } from "react";
import Typography from "../ui/Typography";

export function TypographyH2({ children }: Readonly<PropsWithChildren>) {
  return <Typography variant="h2">{children}</Typography>;
}
