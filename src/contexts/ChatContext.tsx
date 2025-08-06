import type { Chat } from "@/data/types";
import { createContext, useState, type ReactNode, useContext, useMemo, useEffect } from "react";

export interface ChatContextType {
    chats:Chat[];
    newChat:Chat;
    activeChatIndex:number;
    activeChat:Chat;
    streamingResponse:string;

    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>;
    setNewChat:React.Dispatch<React.SetStateAction<Chat>>;
    setStreamingResponse:React.Dispatch<React.SetStateAction<string>>;
}

export const newChatDefaultObject : Chat = {
    _id: "",
    userId: "",
    title: "",
    chatName:"",
    chatQueries: [],
    model: "llama3-70b-8192",
    webSearch: false,
    files: [],
    systemPrompt:  `You are a helpful assistant. Be Polite and Kind.
        Always respond using **GitHub-flavored Markdown**.
        - Use code blocks for all code examples using:
        \`\`\`language_name
        // your code here
        \`\`\`
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
    streamingResponse:"",

    setChats: () => { },
    setActiveChatIndex: () => { },
    setNewChat: () => { },
    setStreamingResponse: () => { },
};

// Create Context
const ChatContext = createContext<ChatContextType>(defaultContext);

// Provider Component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<Chat[]>(defaultContext.chats);
    const [activeChatIndex, setActiveChatIndex] = useState<number>(defaultContext.activeChatIndex);
    const [newChat,setNewChat] = useState<Chat>({...defaultContext.newChat});
    const [activeChat,setActiveChat] = useState<Chat>(defaultContext.activeChat);
    const [streamingResponse,setStreamingResponse] = useState<string>(defaultContext.streamingResponse);

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

        setChats,
        setActiveChatIndex,
        setNewChat,
        setStreamingResponse
    }), [chats, activeChatIndex, newChat, activeChat, streamingResponse]);

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