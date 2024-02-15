import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";

export const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="pb-8">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Takuya's homepage" />
        <meta name="author" content="Angel Dijoux" />
        <meta name="author" content="elki" />
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

      <div className="container pt-14">{children}</div>
    </main>
  );
};
