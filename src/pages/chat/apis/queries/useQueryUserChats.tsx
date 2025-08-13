import type { ChatType } from '@/data/types';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../../../lib/apiClient';

const getUserChats = async (clerkUserId:string | undefined) : Promise<Omit<ChatType,"files" | "chatQueries">[]> => {
    if(!clerkUserId) return[];
    const response = await apiRequest<Omit<ChatType,"files" | "chatQueries">[]>("/chat/user/"+clerkUserId,'GET');
    return response;
}

const useQueryUserChats = (clerkUserId:string | undefined) =>  { 
    return useQuery({
        queryKey:["GetUserChats",clerkUserId] as const,
        queryFn: () =>  getUserChats(clerkUserId) ,
        enabled:!!clerkUserId,
        retry: false
    })
};

export default useQueryUserChats;

