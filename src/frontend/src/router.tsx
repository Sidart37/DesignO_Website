import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import App from "./App";
import { ProjectDetail } from "./ProjectDetail";

// ─── Root route ────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// ─── Index route (main landing page) ──────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

// ─── Project detail route ──────────────────────────────────────────────────────
const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/$id",
  component: ProjectDetail,
});

// ─── Router instance ───────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([indexRoute, projectRoute]);

export const router = createRouter({ routeTree });

// ─── Type registration ─────────────────────────────────────────────────────────
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
