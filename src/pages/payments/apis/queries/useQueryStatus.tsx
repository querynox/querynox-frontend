import type { CheckoutResponseType, PaymentSearchType } from "@/data/types";
import { apiRequest } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

const fetchStatus = async (params:PaymentSearchType): Promise<CheckoutResponseType> => {
  const response = await apiRequest<CheckoutResponseType>('/payments/status/'+params.checkout_id,'GET',{},{"Cache-Control":"no-cache"});
  return response;
};

const useQueryPaymentStatus = (params:PaymentSearchType) => {
  return useQuery({
    queryKey: ['models'],
    queryFn: async () => {
        const res = await fetchStatus(params);

      if (res?.status === "pending") {
        throw res;
      }

      return res;
    },
    refetchOnWindowFocus:false,
    retry(failureCount, error:any ){
        if (error?.status === 400)return false;
        if(failureCount>20) return false;
        return true;
    },
    retryDelay(failureCount, error) {
        if(failureCount<5) return 3000;
        else if(failureCount<10) return 7000;
        else if(failureCount<15) return 15000;
        return 20000;
    },
  });
};

export default useQueryPaymentStatus;