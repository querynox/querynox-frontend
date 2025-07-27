import {  mutationOptions, queryOptions } from "@tanstack/react-query";
import { createChat, getUserChats } from "./api";
import type { CreateChatResponse, CreateChatInput } from "@/data/types";


export const createGetUserChatsQueryOptions= (clerkUserId:string | undefined) =>  { 
    return queryOptions({
        queryKey:["GetUserChats",clerkUserId] as const,
        queryFn: () => { if(clerkUserId) return getUserChats(clerkUserId) },
        enabled: !!clerkUserId,
    })
};


export const createChatMutationOptions = (
  onSuccess?: (data: CreateChatResponse, variables: CreateChatInput, context: unknown) => void,
  onError?: (error: unknown, variables: CreateChatInput, context: unknown) => void
) =>
  mutationOptions<CreateChatResponse, unknown, CreateChatInput>({
    mutationKey: ['createChat'],
    mutationFn: async (input : CreateChatInput) => {
      const { clerkUserId, chatId, prompt, model, systemPrompt, webSearch, files } = input;
      return createChat(clerkUserId, chatId, prompt, model, systemPrompt, webSearch,files);
    },
    onSuccess,
    onError,
  });


