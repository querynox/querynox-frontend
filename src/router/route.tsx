import {
  createRouter,
} from '@tanstack/react-router';

import * as TanStackQueryProvider from '@/integrations/tanstack-query/root-provider';

//import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createRootRoute } from '@tanstack/react-router';
//import TanStackQueryLayout from '@/integrations/tanstack-query/layout';


//Routes
import { homeRoute } from './routes/home.route';
import { aboutRoute } from './routes/about.route';
import { chatRoute } from './routes/chat.route';
import { chatIdRoute } from './routes/chatid.chat.route';
import { termsConditionsRoute } from './routes/termsconditions.route';
import { paymentsRoute } from './routes/payments.route';
import { shareRoute } from './routes/share.route';
import { shareIdRoute } from './routes/shareid.route';

import NotFound from '@/pages/notfound/NotFound';
import Error from '@/pages/error/Error';
import { privacyPolicyRoute } from './routes/privacypolicy.route';

//RootRoute
export const rootRoute = createRootRoute();

// Create the route tree by adding child routes to the root
const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  termsConditionsRoute,
  privacyPolicyRoute,
  paymentsRoute,
  chatRoute.addChildren([
    chatIdRoute
  ]),
  shareRoute.addChildren([
    shareIdRoute
  ]),
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
  defaultNotFoundComponent:NotFound,
  defaultErrorComponent: (error) => {
    return <Error error={error.error} />
  },
});
