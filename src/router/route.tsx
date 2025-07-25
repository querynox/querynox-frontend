import {
  createRouter,
} from '@tanstack/react-router';

import * as TanStackQueryProvider from '@/integrations/tanstack-query/root-provider';

import { Outlet } from "@tanstack/react-router";
//import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createRootRoute } from '@tanstack/react-router';
//import TanStackQueryLayout from '@/integrations/tanstack-query/layout';


//Routes
import { homeRoute } from './routes/home.route';
import { notFoundRoute } from './routes/notfound.route';
import { chatIdRoute } from './routes/chatid.route';
import { chatRoute } from './routes/chat.route';

//RootRoute
export const rootRoute = createRootRoute({
  component: () => (
    <main className="flex-1 w-full">
        <Outlet />
    </main>
)});

// Create the route tree by adding child routes to the root
const routeTree = rootRoute.addChildren([
  homeRoute,
  chatRoute,
  chatIdRoute,
  notFoundRoute,
]);

// Create the router instance
export const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});
