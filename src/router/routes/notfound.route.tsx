import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/router/route";
import NotFound from "@/pages/notfound/NotFound";

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});