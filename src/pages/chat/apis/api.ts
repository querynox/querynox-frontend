import axios from 'axios';

import { BACKEND_URL } from "@/data/constants";
import type { Chat, CreateChatResponse } from '@/data/types';
import type { ModelEnum } from '@/data/models';

export const getUserChats = async (clerkUserId:string) : Promise<Omit<Chat,"files">[]> => {
    try {
        if(clerkUserId==undefined) return[];
        const response = await axios.get(BACKEND_URL+"/api/chats/user/"+clerkUserId);
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const createChat = async (clerkUserId:string, chatId:string, prompt:string, model:ModelEnum , systemPrompt:string , webSearch:boolean, files:File[] ) : Promise<CreateChatResponse> => {
    try {
        const formData = new FormData();
        formData.append("clerkUserId",clerkUserId);
        formData.append("chatId",chatId);
        formData.append("prompt",prompt);
        formData.append("model",model);
        formData.append("systemPrompt",systemPrompt);
        formData.append("webSearch",webSearch ? "true" : "false");
        
        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        const response = await axios.post(BACKEND_URL + "/api/chat", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data
    } catch (error) {
        const _error = Error();
        if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error.response?.data || error.message);
            _error.message = error.message
            _error.stack = error.stack
            _error.name = error.name
            _error.cause = error.cause
            return { error: _error, isError:true};
        } else {
            console.error("Unknown Error:", error);
            _error.message = JSON.stringify(error);
            return { error: _error, isError:true };
        }
    }
}
