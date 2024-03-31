import { NavBar } from "@/navigation/NavBar";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export const MainLayout = () => {
  return (
    <main className="pb-8">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Takuya's homepage" />
        <meta name="author" content="Angel Dijoux" />
        <meta name="author" content="elki" />
        <link rel="icon" type="image/svg+xml" href="/star-rounded.ico" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:title" content="Angel Dijoux" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://TODO" />
        <meta property="og:site_name" content="Angel Dijoux" />
        <meta name="og:title" content="Angel Dijoux" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://TODO" />
        <title>Angel Dijoux - Homepage</title>
      </Helmet>
      <NavBar path="/" />
      <div className="container max-w-2xl pt-24">
        <div className=" max-w-xl">
          <Outlet />
          <Footer />
        </div>
      </div>
    </main>
  );
};
