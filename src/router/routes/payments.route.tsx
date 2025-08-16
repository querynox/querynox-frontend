import { createRoute } from "@tanstack/react-router";
import { rootRoute } from  "@/router/route";
import Payments from "@/pages/payments/Payments";

export const paymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payments',
  component: Payments
});
