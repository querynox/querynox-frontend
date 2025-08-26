import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/lib/apiClient'
import { useAuth } from '@clerk/clerk-react'

type BookmarkPayload = { chatId: string; bookmarked: boolean }

type BookmarkResult = { bookmarked: boolean }

const useMutationBookmarkChat = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ chatId, bookmarked }: BookmarkPayload): Promise<BookmarkResult> => {
      const token = await getToken()
      return apiRequest(`/chat/${chatId}/bookmark`, 'PATCH', { bookmarked }, token ? { authorization: `Bearer ${token}` } : undefined)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarked-chats'] })
    }
  })
}

export default useMutationBookmarkChat
