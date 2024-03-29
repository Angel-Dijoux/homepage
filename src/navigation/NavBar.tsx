import { type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";

type LinkItemProps = {
  href: string;
  path: string;
  target?: string;
};

const LinkItem = ({
  href,
  path,
  target,
  children,
  ...props
}: PropsWithChildren<LinkItemProps>) => {
  const active = path === href;
  const inactiveColor = "text-gray-800 dark:text-white";
  const activeBgColor = "bg-green-500";
  const activeTextColor = "text-gray-900";

  return (
    <Link
      to={href}
      className={`block p-2 ${active ? activeBgColor : ""} ${
        active ? activeTextColor : inactiveColor
      }`}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
};

type NavBarProps = {
  path: string;
};

export function NavBar({ path }: Readonly<NavBarProps>) {
  const { setTheme, theme } = useTheme();

  return (
    <div className="fixed flex w-full justify-start items-center  bg-gradient-to-b from-transparent to-background bg-repeat bg-radial bg-cover backdrop-blur-md text-base leading-14 z-20">
      <div className="container flex p-2 max-w-2xl flex-wrap items-center justify-between">
        <div className="mr-5">
          <Logo />
        </div>

        <div className="flex-col md:flex-row hidden md:flex w-full md:w-auto items-center flex-grow mt-4 md:mt-0">
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
        </div>
        <Switch
          onCheckedChange={() => setTheme(theme == "light" ? "dark" : "light")}
        />
      </div>
    </div>
  );
}
