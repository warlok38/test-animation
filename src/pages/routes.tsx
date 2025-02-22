import { RouteObject } from "react-router";
import { lazyImport } from "./lazyImport";

export const routes: RouteObject[] = [
  {
    path: "/",
    id: "main",
    element: lazyImport("MainPage"),
  },
  {
    path: "/scene",
    id: "scene",
    element: lazyImport("ScenePage"),
  },
  {
    path: "/scene2",
    id: "scene2",
    element: lazyImport("Scene2Page"),
  },
  {
    path: "/fall-guys-game",
    id: "fallGuysGame",
    element: lazyImport("FallGuysGamePage"),
  },
  {
    path: "*",
    id: "notFound",
    element: lazyImport("NotFoundPage"),
  },
];
