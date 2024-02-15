import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/router.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </ThemeProvider>
  </React.StrictMode>
);
