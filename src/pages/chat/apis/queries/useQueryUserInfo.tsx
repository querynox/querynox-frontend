import type { UserType } from '@/data/types';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../../../lib/apiClient';
import { useAuth } from "@clerk/clerk-react";

const getUserInfo = async (token:string | null) : Promise<UserType> => {
    const response = await apiRequest<{user:UserType}>("/user",'GET',{},{"authorization":`Bearer ${token}`});
    return response.user;
}

const useQueryUserInfo = () =>  { 
    const { getToken } = useAuth();
    return useQuery({
        queryKey:["GetUserInfo"],
        queryFn: async () =>  {
            const token = await getToken(); 
            return getUserInfo(token) 
        },
        retry: false,
        enabled:false
    })
};

export default useQueryUserInfo;

