import { createRoute } from "@tanstack/react-router";
import { rootRoute } from  "@/router/route";
import About from "@/pages/about/About";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About
});
