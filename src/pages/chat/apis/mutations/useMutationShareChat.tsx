import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/lib/apiClient'
import { useAuth } from '@clerk/clerk-react'

type SharePayload = { chatId: string; isShared: boolean }

const useMutationShareChat = () => {
  const { getToken } = useAuth()
  return useMutation({
    mutationFn: async ({ chatId, isShared }: SharePayload) => {
      const token = await getToken()
      return apiRequest(`/chat/${chatId}/share`, 'PATCH', { isShared }, token ? { authorization: `Bearer ${token}` } : undefined)
    },
  })
}

export default useMutationShareChat
