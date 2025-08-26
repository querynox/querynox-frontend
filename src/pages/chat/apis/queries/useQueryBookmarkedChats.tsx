import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/lib/apiClient'
import { useAuth } from '@clerk/clerk-react'

type BookmarkedChat = {
  _id: string
  title: string
  createdAt: number
  updatedAt: number
}

type BookmarkedResponse = {
  chats: BookmarkedChat[]
}

const useQueryBookmarkedChats = () => {
  const { getToken } = useAuth()
  return useQuery({
    queryKey: ['bookmarked-chats'],
    queryFn: async (): Promise<BookmarkedResponse> => {
      const token = await getToken()
      return apiRequest<BookmarkedResponse>(
        '/user/bookmarked-chats',
        'GET',
        undefined,
        token ? { authorization: `Bearer ${token}` } : undefined
      )
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  })
}

export default useQueryBookmarkedChats
