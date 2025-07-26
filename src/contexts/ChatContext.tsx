import { chats } from "@/data/tempChatData";
import type { Chat } from "@/data/types";
import { createContext, useState, type ReactNode, useContext, useMemo } from "react";

export interface ChatContextType {
    chats:Chat[];
    newChat:Chat;
    activeChatIndex:number;

    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>;
    setNewChat:React.Dispatch<React.SetStateAction<Chat>>;
}

export const newChatDefaultObject : Chat = {
    _id: "",
    userId: "",
    title: "",
    model: "gpt-3.5-turbo",
    webSearch: false,
    messages: [],
    createdAt: "",
    updatedAt: "",
    systemPrompt: "You are a helpful Assistant",
    files: []
}

// Default Context Values
const defaultContext: ChatContextType = {
    chats:[],
    activeChatIndex:-1,
    newChat:newChatDefaultObject,

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

    const value = useMemo(() => ({
        chats,
        activeChatIndex,
        newChat,

        setChats,
        setActiveChatIndex,
        setNewChat
    }), [chats, activeChatIndex, newChat]);

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