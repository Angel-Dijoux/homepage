import { PropsWithChildren } from "react";
import Typography from "../ui/Typography";

export function TypographyH4({ children }: Readonly<PropsWithChildren>) {
  return <Typography variant="h4">{children}</Typography>;
}
