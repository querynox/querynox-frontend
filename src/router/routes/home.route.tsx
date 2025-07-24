import { createRoute } from "@tanstack/react-router";
import { rootRoute } from  "@/router/route";
import Home from "@/pages/home/Home";

//Create the home route as a child of the root route
export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
   ,
});