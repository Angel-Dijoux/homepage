import Typography from "../ui/Typography";

export const Footer = () => (
  <div className="flex justify-center opacity-40">
    <Typography variant="p" affects="muted">
      &copy; {new Date().getFullYear()} Angel Dijoux. All Rights Reserved.
    </Typography>
  </div>
);
