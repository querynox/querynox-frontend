import { chats } from "@/data/tempChatData";
import type { Chat } from "@/data/types";
import { createContext, useState, type ReactNode, useContext, useMemo } from "react";

export interface ChatContextType {
    chats:Chat[]
    activeChatIndex:number;

    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Default Context Values
const defaultContext: ChatContextType = {
    chats:chats.sort((a,b) => parseInt(b.updatedAt) - parseInt(a.updatedAt) ),
    activeChatIndex:-1,

    setChats: () => { },
    setActiveChatIndex: () => {}
};

// Create Context
const ChatContext = createContext<ChatContextType>(defaultContext);

// Provider Component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<Chat[]>(defaultContext.chats);
    const [activeChatIndex, setActiveChatIndex] = useState<number>(defaultContext.activeChatIndex);

    const value = useMemo(() => ({
        chats,
        activeChatIndex,
        setChats,
        setActiveChatIndex
    }), [chats, activeChatIndex]);

    return (
        <ChatContext.Provider
            value={value}
        >
            {children}
        </ChatContext.Provider>
    );
};

// Custom Hook to use the User Context
export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext must be used within a ChatProvider");
    }

    return context;
};

export default ChatContext;