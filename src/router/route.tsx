import {
  createRouter,
} from '@tanstack/react-router';

import * as TanStackQueryProvider from '@/integrations/tanstack-query/root-provider';

import { Outlet } from "@tanstack/react-router";
//import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createRootRoute } from '@tanstack/react-router';
//import TanStackQueryLayout from '@/integrations/tanstack-query/layout';

import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/clerk-react';

//Routes
import { homeRoute } from './routes/home.route';
import { notFoundRoute } from './routes/notfound.route';

//RootRoute
export const rootRoute = createRootRoute({
  component: () => (
    <>
      <SignedOut>
          <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Outlet />
    </>
  ),
});

// Create the route tree by adding child routes to the root
const routeTree = rootRoute.addChildren([
  homeRoute,
  notFoundRoute
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
