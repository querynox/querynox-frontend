import type { Chat } from '@/data/types';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../apiClient';

const getUserChats = async (clerkUserId:string | undefined) : Promise<Omit<Chat,"files" | "chatQueries">[]> => {
    if(!clerkUserId) return[];
    const response = await apiRequest<Omit<Chat,"files" | "chatQueries">[]>("/chats/user/"+clerkUserId,'GET');
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

