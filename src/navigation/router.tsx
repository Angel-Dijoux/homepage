import { MainLayout } from "@/components/layouts/MainLayout";
import { Home } from "@/pages/Home";
import { Works } from "@/pages/Works";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "works",
        element: <Works />,
      },
    ],
  },
]);
