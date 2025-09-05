import type { UserType } from '@/data/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../../../lib/apiClient';
import { useAuth } from "@clerk/clerk-react";


const getUserInfo = async (token:string | null, callback: (user:UserType) => void) : Promise<UserType> => {
    const response = await apiRequest<{user:UserType}>("/user",'GET',{},{"authorization":`Bearer ${token}`});
    callback(response.user)
    return response.user;
}

const useQueryUserInfo = (userid:string|undefined) =>  { 
    const { getToken } = useAuth();
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey:["GetUserInfo",userid],
        queryFn: async () =>  {
            const token = await getToken(); 
            return getUserInfo(token,(user:UserType) => {
                const queryState = queryClient.getQueryState(["GetUserInfo"]);    
                if(queryState?.dataUpdatedAt && queryState?.dataUpdatedAt < user.updatedAt ){
                    queryClient.invalidateQueries()//Invalidate all queryes if User has updated.
                }
            }) 
        },
        retry: false,
        enabled:!!userid,
        refetchOnMount:false,
        refetchOnWindowFocus:true,
        refetchOnReconnect:true
    })
    return query
};

export default useQueryUserInfo;

