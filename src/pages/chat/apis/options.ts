import {  mutationOptions, queryOptions } from "@tanstack/react-query";
import { createChat, getUserChats } from "./api";
import type { ModelEnum } from "@/data/models";


export interface CreateChatInput {
  clerkUserId: string;
  chatId: string;
  prompt: string;
  model: ModelEnum;
  systemPrompt: string;
  webSearch: boolean;
}

export interface CreateChatResponse {
  chatId: string;
  response: string;
} 

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
    mutationFn: async (input) => {
      const { clerkUserId, chatId, prompt, model, systemPrompt, webSearch } = input;
      return createChat(clerkUserId, chatId, prompt, model, systemPrompt, webSearch);
    },
    onSuccess,
    onError,
  });


