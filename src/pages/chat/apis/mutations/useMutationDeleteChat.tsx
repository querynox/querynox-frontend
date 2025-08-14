import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../../lib/apiClient";
import { useAuth } from "@clerk/clerk-react";

const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ chatId }: { chatId: string}) => {
      const token = await getToken(); 
      return apiRequest<{ message: string }>(`/chat/${chatId}`, "DELETE",{}, {"authorization":`Bearer ${token}`});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      console.error("Failed to delete chat:", error);
    }
  });
}

export default useDeleteChat;