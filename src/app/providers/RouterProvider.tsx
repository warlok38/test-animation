import { routes } from "@/pages/routes";
import { Suspense } from "react";
import { useRoutes } from "react-router";

export const RouterProvider = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>{useRoutes(routes)}</Suspense>
  );
};
