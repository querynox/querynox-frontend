import { createRoute, } from "@tanstack/react-router";
import { rootRoute } from  "@/router/route";
import Payments from "@/pages/payments/Payments";
import type { PaymentSearchType } from "@/data/types";

export const paymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payments',
  component: Payments,
  validateSearch: (
    search: Record<string, string | string[] | undefined>
  ): PaymentSearchType => {

    const toSingle = (v: string | string[] | undefined) => Array.isArray(v) ? v[0] : v ?? ''

    const ret =  {
      checkout_id: toSingle(search.checkout_id),
      customer_session_token: toSingle(search.customer_session_token),
    }
    
    if (!ret.checkout_id || !ret.customer_session_token) {
      throw new Error("Broken Link")
    }
    
    return ret
  },
});
