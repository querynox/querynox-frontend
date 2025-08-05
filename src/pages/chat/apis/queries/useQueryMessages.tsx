import type { Chat } from '@/data/types';
import { apiRequest } from '../apiClient';
import { useQuery } from '@tanstack/react-query';

const fetchMessages = async (chatId:string): Promise<Omit<Chat,"files">> => {
  const response = await apiRequest<Omit<Chat,"files">>('/chat/'+chatId,'GET');
  return response;
};

const useQueryMessages = (chatId:string) => {
  return useQuery({
    queryKey: ['models',chatId],
    queryFn: () => fetchMessages(chatId),
    enabled: !!chatId,
    retry: false,
  });
};

export default useQueryMessages;