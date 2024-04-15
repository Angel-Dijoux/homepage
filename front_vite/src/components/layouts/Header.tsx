import { Logo } from "@/components/Logo";
import { useTheme } from "@/components/ThemeProvider";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="fixed w-full bg-gradient-to-b from-transparent to-background bg-repeat bg-radial bg-cover backdrop-blur-md text-base leading-14 z-20">
      <div className="container flex p-2 max-w-2xl flex-wrap items-center justify-between">
        <div className="mr-5">
          <Logo />
        </div>

        <div className="flex-col md:flex-row hidden md:flex w-full md:w-auto items-center flex-grow mt-4 md:mt-0.5">
          <Link to="/works" className="block p-2 [&.active]:font-bold">
            Works
          </Link>
          <Link to="/quantum" className="block p-2 [&.active]:font-bold">
            Quantum
          </Link>
        </div>
        <Button
          variant="outline"
          className="h-8 p-2 px-2"
          onClick={() => setTheme(theme == "light" ? "dark" : "light")}
        >
          {theme == "light" ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
