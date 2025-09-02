
import type { CreateChatInputType, CreateChatOutputType } from "@/data/types";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../lib/apiClient"
import { useAuth } from "@clerk/clerk-react";


const chat = async (token:string | null, chatId:string, prompt:string, model: string , systemPrompt:string , webSearch:boolean, files:File[] ) : Promise<CreateChatOutputType> => {
    const formData = new FormData();
    formData.append("prompt",prompt);
    formData.append("model",model);
    formData.append("systemPrompt",systemPrompt);
    formData.append("webSearch",webSearch ? "true" : "false");
    
    Array.from(files).forEach((file) => {
        formData.append("files", file);
    });

    const url =  chatId ? ("/chat/" + chatId) : "/chat";
    console.log("🔄 Non-stream request to:", url, "with token:", token ? "present" : "missing");
    
    try {
      const response = await apiRequest<CreateChatOutputType>(url,"POST",formData,{"Content-Type": "multipart/form-data","authorization":`Bearer ${token}`})
      console.log("✅ Non-stream response received");
      return response;
    } catch (error) {
      console.error("❌ Non-stream error:", error);
      throw error;
    }
}

const useMutationChat = (
  onSuccess: (data: CreateChatOutputType, variables: CreateChatInputType, context: unknown) => void,
  onError?: (error: unknown, variables: CreateChatInputType, context: unknown) => void
) => {
  const { getToken } = useAuth();
  return useMutation({
    mutationKey: ['createChat'],
    mutationFn: async (input : CreateChatInputType) => {
      const token = await getToken(); 
      const {chatId, prompt, model, systemPrompt, webSearch, files } = input;
      return chat(token, chatId, prompt, model, systemPrompt, webSearch,files);
    },
    onSuccess,
    onError,
})};

export default useMutationChat;
