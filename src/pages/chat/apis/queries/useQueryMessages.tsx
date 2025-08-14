import type { ChatType } from '@/data/types';
import { apiRequest } from '../../../../lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

const fetchMessages = async (chatId:string,token:string | null): Promise<Omit<ChatType,"files">> => {
  const response = await apiRequest<Omit<ChatType,"files">>('/chat/'+chatId,'GET',{},{"authorization":`Bearer ${token}`});
  return response;
};

const useQueryMessages = (chatId:string) => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ['models',chatId],
    queryFn: async () => { 
      const token = await getToken(); 
      return fetchMessages(chatId,token)
    },
    enabled: !!chatId,
    retry: false,
  });
};

export default useQueryMessages;