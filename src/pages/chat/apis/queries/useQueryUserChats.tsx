import type { ChatType } from '@/data/types';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../../../lib/apiClient';
import { useAuth } from "@clerk/clerk-react";

const getUserChats = async (token:string | null) : Promise<Omit<ChatType,"files" | "chatQueries">[]> => {
    const response = await apiRequest<Omit<ChatType,"files" | "chatQueries">[]>("/chat/user",'GET',{},{"authorization":`Bearer ${token}`});
    return response;
}

const useQueryUserChats = () =>  { 
    const { getToken } = useAuth();
    return useQuery({
        queryKey:["GetUserChats"],
        queryFn: async () =>  {
            const token = await getToken(); 
            return getUserChats(token) 
        },
        retry: false
    })
};

export default useQueryUserChats;

