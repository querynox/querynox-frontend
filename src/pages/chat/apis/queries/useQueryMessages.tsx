import type { ChatType } from '@/data/types';
import { apiRequest } from '../../../../lib/apiClient';
import { useQuery } from '@tanstack/react-query';

const fetchMessages = async (chatId:string): Promise<Omit<ChatType,"files">> => {
  const response = await apiRequest<Omit<ChatType,"files">>('/chat/'+chatId,'GET');
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