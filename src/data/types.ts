
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
  title?:string;
  error?:string;
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


export type UserType = {
  id:String,
  chats:String[],
  productId:String|null,
  usedChatGeneration:number,
  usedImageGeneration:number,
  usedWebSearch:number,
  usedFileRag:number,
  limitsUpdatedAt:number,
  createdAt:number,
  isPro:true,
  product?:{
    metadata: {
      fileRagLimit: number;
      fileCountLimit: number;
      webSearchLimit: number;
      chatGenerationLimit: number;
      imageGenerationLimit: number;
    };
    _id: string;
    __v: number;
    attachedCustomFields: any[];
    benefits: any[];
    createdAt: number;
    description: string;
    isArchived: boolean;
    isRecurring: boolean;
    medias: any[];
    modifiedAt: number;
    name: string;
    organizationId: string;
    prices: {
      createdAt: string;        // ISO timestamp
      modifiedAt: string;       // ISO timestamp
      id: string;
      amountType: string;       // e.g. "fixed"
      isArchived: boolean;
      productId: string;
      type?: string;            // legacy field
      recurringInterval?: string; // legacy field
      priceCurrency: string;    // e.g. "usd"
      priceAmount: number;
    }[];
    recurringInterval: "month" | "year" | string;
  },
}