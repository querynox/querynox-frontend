
export type ChatQuery = {
  _id: string;
  chatId: string;
  prompt:string;
  model:string
  systemPrompt: string,
  webSearch:boolean,
  response: string;
  createdAt: number;
  updatedAt: number;
  chatName?:string;
  title?:string
};

export type Model = {
  name:string;
  category:string;
  description:string
};

export type Chat = {
  _id: string;
  userId:string;
  title:string;
  chatName:string;
  chatQueries: ChatQuery[];
  model:string
  webSearch:boolean,
  files:File[];
  systemPrompt: string,
  createdAt: number;
  updatedAt: number;
};

export type CreateChatInput = {
  clerkUserId: string;
  chatId: string;
  prompt: string;
  model: string;
  systemPrompt: string;
  webSearch: boolean;
  files:File[];
}


export type CreateChatOutput = {
  chatQuery:ChatQuery,
  chat?:Omit<Chat, 'chatQueries' | 'files' >
}

export type StreamChatOutput = {
  type:  'status' ;
  message:string;
} | {
  type: 'error' ;
  error:string;
} | {
  type: 'metadata' ;
  chatId:string;
  chatName:string;
} | {
  type: 'complete' ;
  chatQuery:ChatQuery;
  chat:Omit<Chat, "chatQueries" | "files">;
} | {
  type: 'content' ;
  content:string;
}