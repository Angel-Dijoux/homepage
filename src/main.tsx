import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/router.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { SWRConfig } from "swr";
import fetcher from "./lib/fetcher.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher,
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </ThemeProvider>
    </SWRConfig>
  </React.StrictMode>
);
