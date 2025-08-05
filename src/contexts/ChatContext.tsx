import type { Chat } from "@/data/types";
import { createContext, useState, type ReactNode, useContext, useMemo, useEffect } from "react";

export interface ChatContextType {
    chats:Chat[];
    newChat:Chat;
    activeChatIndex:number;
    activeChat:Chat;

    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>;
    setNewChat:React.Dispatch<React.SetStateAction<Chat>>;
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
    systemPrompt: "You are a helpful Assistant. Always output in Github's Markdown Format.Always use code highlight using \`\`\`language_name {{code}} \`\`\` tag.",
    createdAt: 9999999999,
    updatedAt: 9999999999,
}

// Default Context Values
const defaultContext: ChatContextType = {
    chats:[],
    activeChatIndex:-1,
    newChat:newChatDefaultObject,
    activeChat:newChatDefaultObject,

    setChats: () => { },
    setActiveChatIndex: () => { },
    setNewChat: () => { }
};

// Create Context
const ChatContext = createContext<ChatContextType>(defaultContext);

// Provider Component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<Chat[]>(defaultContext.chats);
    const [activeChatIndex, setActiveChatIndex] = useState<number>(defaultContext.activeChatIndex);
    const [newChat,setNewChat] = useState<Chat>(defaultContext.newChat);
    const [activeChat,setActiveChat] = useState<Chat>(defaultContext.activeChat);

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
        
        setChats,
        setActiveChatIndex,
        setNewChat,
    }), [chats, activeChatIndex, newChat, activeChat]);

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