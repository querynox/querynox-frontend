import { createRoute } from "@tanstack/react-router";
import { rootRoute } from  "@/router/route";
import PrivacyPolicy from "@/pages/privacypolicy/PrivacyPolicy";

export const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicy
});