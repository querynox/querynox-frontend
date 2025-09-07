import type { ChatType } from "@/data/types";
import { createContext, useState, type ReactNode, useContext, useMemo, useEffect } from "react";

export interface ChatContextType {
    chats:ChatType[];
    newChat:ChatType;
    activeChatIndex:number;
    activeChat:ChatType;
    streamingResponse:{chatid:string,content:string};
    chatError:{chatid:string,content:string};
    chatStatus:{chatid:string,content:string};

    setChats: React.Dispatch<React.SetStateAction<ChatType[]>>;
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>;
    setNewChat:React.Dispatch<React.SetStateAction<ChatType>>;
    setStreamingResponse:React.Dispatch<React.SetStateAction<{chatid:string,content:string}>>;
    setChatError:React.Dispatch<React.SetStateAction<{chatid:string,content:string}>>;
    setChatStatus: React.Dispatch<React.SetStateAction<{chatid:string,content:string}>>;
}

export const newChatDefaultObject : ChatType = {
    _id: "",
    userId: "",
    title: "",
    chatName:"",
    chatQueries: [],
    model: "llama-3.3-70b-versatile",
    webSearch: false,
    files: [],
    systemPrompt:  `You are a helpful assistant. Be Polite and Kind.
        Always respond using **GitHub-flavored Markdown**. Width of messages should be short.
        - Use code blocks wherever applicable.
        When additional context is provided, follow these rules:
        ---
        ### 🔍 Relevant information from web search  
        - If present, **assume this is up-to-date and accurate**, and use it to override or supplement your internal knowledge.
        - Summarize or synthesize the top 3 results into your answer where relevant.
        - Always **prioritize factual alignment with search results** when available.
        ---
        ### 📄 Relevant context from uploaded documents  
        - If provided, **extract key ideas or facts** and integrate them naturally into your answers.
        - If there's a conflict between document context and your internal knowledge, **defer to the document**.
        ---
        Be concise, technically correct, and assume the user prefers direct, developer-friendly answers.
        `,
    createdAt: 9999999999,
    updatedAt: 9999999999,
}

// Default Context Values
const defaultContext: ChatContextType = {
    chats:[],
    activeChatIndex:-1,
    newChat:newChatDefaultObject,
    activeChat:newChatDefaultObject,
    streamingResponse:{chatid:"",content:""},
    chatError:{chatid:"",content:""},
    chatStatus:{chatid:"",content:""},

    setChats: () => { },
    setActiveChatIndex: () => { },
    setNewChat: () => { },
    setStreamingResponse: () => { },
    setChatError: () => { },
    setChatStatus: () => { },
};

// Create Context
const ChatContext = createContext<ChatContextType>(defaultContext);

// Provider Component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<ChatType[]>(defaultContext.chats);
    const [activeChatIndex, setActiveChatIndex] = useState<number>(defaultContext.activeChatIndex);
    const [newChat,setNewChat] = useState<ChatType>({...defaultContext.newChat});
    const [activeChat,setActiveChat] = useState<ChatType>(defaultContext.activeChat);
    const [streamingResponse,setStreamingResponse] = useState<{chatid:string,content:string}>(defaultContext.streamingResponse);
    const [chatError,setChatError] = useState<{chatid:string,content:string}>(defaultContext.chatError);
    const [chatStatus, setChatStatus] = useState<{chatid:string,content:string}>(defaultContext.chatStatus);

    useEffect(() => {
        const nextChat = activeChatIndex >= 0 && activeChatIndex < chats.length
            ? chats[activeChatIndex]
            : newChat;
        setActiveChat(nextChat);
    }, [activeChatIndex, chats, newChat])

    const value = useMemo(() => ({
        chats,
        activeChatIndex,
        newChat,
        activeChat,
        streamingResponse,
        chatError,
        chatStatus,

        setChats,
        setActiveChatIndex,
        setNewChat,
        setStreamingResponse,
        setChatError,
        setChatStatus,
    }), [chats, activeChatIndex, newChat, activeChat, streamingResponse,chatError]);

    return (
        <ChatContext.Provider
            value={value}
        >
            {children}
        </ChatContext.Provider>
    );
};

// Custom Hook to use the User Context
export const useChatContext = () : ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext must be used within a ChatProvider");
    }

    return context;
};

export default ChatContext;