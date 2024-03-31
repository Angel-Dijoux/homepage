import { Logo } from "@/components/Logo";
import { useTheme } from "@/components/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { Link } from "@tanstack/react-router";

export function NavBar() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="fixed flex w-full justify-start items-center  bg-gradient-to-b from-transparent to-background bg-repeat bg-radial bg-cover backdrop-blur-md text-base leading-14 z-20">
      <div className="container flex p-2 max-w-2xl flex-wrap items-center justify-between">
        <div className="mr-5">
          <Logo />
        </div>

        <div className="flex-col md:flex-row hidden md:flex w-full md:w-auto items-center flex-grow mt-4 md:mt-0">
          <Link to="/works" className="block p-2 [&.active]:font-bold">
            Works
          </Link>
        </div>
        <Switch
          onCheckedChange={() => setTheme(theme == "light" ? "dark" : "light")}
        />
      </div>
    </div>
  );
}
