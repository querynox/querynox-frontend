
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
  isShared?: boolean;
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

export type PaymentSearchType = {
  checkout_id: string
  customer_session_token: string
}

export type CheckoutResponseType = {
  id: string;
  status: "pending"
  | "succeeded"
  | "failed"
  | "canceled"
  | "requires_action"
  | "invalid";
  customer: {
    id: string;
    email: string;
    name: string;
    clerkUserId: string;
  };
  product: {
    id: string | null;
    name: string | null;
    description: string | null;
    recurringInterval: "day" | "week" | "month" | "year" | null;
    isRecurring: boolean | null;
    isArchived: boolean | null;
    organizationId: string | null;
    modifiedAt: string | null; // ISO date string
    createdAt: string | null;  // ISO date string
  };
  orderId: string | null;
  createdAt: string; // ISO date string
}