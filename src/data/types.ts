import type { ModelEnum } from "./models";

export type Message = {
  _id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
  imageUrl?:string;
};


export type Chat = {
  _id: string;
  userId: string;
  title: string;
  model: ModelEnum;
  systemPrompt: string;
  webSearch: boolean;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  files:File[];
  imageUrl?:string;
};

export type CreateChatInput = {
  clerkUserId: string;
  chatId: string;
  prompt: string;
  model: ModelEnum;
  systemPrompt: string;
  webSearch: boolean;
  files:File[];
}

export type CreateChatResponse = {
  chat: Chat;
  response: string;
  isError:false;
} | { error:Error, isError:true }
