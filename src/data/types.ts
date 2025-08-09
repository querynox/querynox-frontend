
export type ChatQueryType = {
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

export type ModelType = {
  name:string;
  category:string;
  description:string
};

export type ChatType = {
  _id: string;
  userId:string;
  title:string;
  chatName:string;
  chatQueries: ChatQueryType[];
  model:string
  webSearch:boolean,
  files:File[];
  systemPrompt: string,
  createdAt: number;
  updatedAt: number;
};

export type CreateChatInputType = {
  clerkUserId: string;
  chatId: string;
  prompt: string;
  model: string;
  systemPrompt: string;
  webSearch: boolean;
  files:File[];
}


export type CreateChatOutputType = {
  chatQuery:ChatQueryType,
  chat?:Omit<ChatType, 'chatQueries' | 'files' >
}

export type StreamChatOutputType = {
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
  chatQuery:ChatQueryType;
  chat:Omit<ChatType, "chatQueries" | "files">;
} | {
  type: 'content' ;
  content:string;
}