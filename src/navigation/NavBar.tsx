import { type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

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
  return (
    <div className="fixed top-0 left-0 w-full bg-white bg-opacity-40 dark:bg-gray-900 bg-blur-10 z-20">
      <div className="container flex p-2 max-w-2xl flex-wrap items-center justify-between">
        <div className="mr-5">
          <Logo />
        </div>

        <div className="flex-col md:flex-row hidden md:flex w-full md:w-auto items-center flex-grow mt-4 md:mt-0">
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
        </div>
      </div>
    </div>
  );
}
