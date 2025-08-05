
import type { CreateChatInput, CreateChatOutput } from "@/data/types";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../apiClient"


const chat = async (clerkUserId:string, chatId:string, prompt:string, model: string , systemPrompt:string , webSearch:boolean, files:File[] ) : Promise<CreateChatOutput> => {
    const formData = new FormData();
    formData.append("clerkUserId",clerkUserId);
    formData.append("prompt",prompt);
    formData.append("model",model);
    formData.append("systemPrompt",systemPrompt);
    formData.append("webSearch",webSearch ? "true" : "false");
    
    Array.from(files).forEach((file) => {
        formData.append("files", file);
    });

    const url =  chatId ? ("/chat/" + chatId) : "/chat";
    const response = await apiRequest<CreateChatOutput>(url,"POST",formData,{"Content-Type": "multipart/form-data"})
    return response
}

const useMutationChat = (
  onSuccess: (data: CreateChatOutput, variables: CreateChatInput, context: unknown) => void,
  onError?: (error: unknown, variables: CreateChatInput, context: unknown) => void
) =>
  useMutation({
    mutationKey: ['createChat'],
    mutationFn: async (input : CreateChatInput) => {
      const { clerkUserId, chatId, prompt, model, systemPrompt, webSearch, files } = input;
      return chat(clerkUserId, chatId, prompt, model, systemPrompt, webSearch,files);
    },
    onSuccess,
    onError,
  });

export default useMutationChat;
