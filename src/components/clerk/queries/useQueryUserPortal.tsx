import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/apiClient'
import { useAuth } from "@clerk/clerk-react";

const getUserPortal = async (token:string | null) : Promise<string> => {
    const response = await apiRequest<{url:string}>("/payments/portal",'GET',{},{"authorization":`Bearer ${token}`});
    return response.url;
}

const useQueryUserPortal= () =>  { 
    const { getToken } = useAuth();
    return useQuery({
        queryKey:["GetUserInfo"],
        queryFn: async () =>  {
            const token = await getToken(); 
            return getUserPortal(token) 
        },
        retry: false,
        enabled:false
    })
};

export default useQueryUserPortal;

