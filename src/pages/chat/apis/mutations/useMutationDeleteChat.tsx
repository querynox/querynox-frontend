import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../apiClient";

const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatId, clerkUserId }: { chatId: string; clerkUserId: string }) => {
    return apiRequest<{ message: string }>(`/chat/${chatId}`, "DELETE", { clerkUserId });
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