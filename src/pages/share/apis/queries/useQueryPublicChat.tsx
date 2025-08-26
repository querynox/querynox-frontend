import type { ChatType } from '@/data/types'
import { apiRequest } from '@/lib/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchPublicChat = async (chatId: string): Promise<Omit<ChatType, 'files'>> => {
  const response = await apiRequest<Omit<ChatType, 'files'>>('/public/chat/' + chatId, 'GET')
  return response
}

const useQueryPublicChat = (chatId: string) => {
  return useQuery({
    queryKey: ['public-chat', chatId],
    queryFn: async () => fetchPublicChat(chatId),
    enabled: !!chatId,
    retry: false,
  })
}

export default useQueryPublicChat
