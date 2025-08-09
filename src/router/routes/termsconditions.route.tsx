import { createRoute } from "@tanstack/react-router";
import { rootRoute } from  "@/router/route";
import TermsConditions from "@/pages/termsconditions/TermsConditions";

export const termsConditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-and-conditions',
  component: TermsConditions
});