import axios from 'axios';

import { BACKEND_URL } from "@/data/constants";
import type { Chat } from '@/data/types';
import type { ModelEnum } from '@/data/models';
import type { CreateChatResponse } from './options';


export const getUserChats = async (clerkUserId:string) : Promise<Omit<Chat,"files">[]> => {
    try {
        if(clerkUserId==undefined) return[];
        const response = await axios.get(BACKEND_URL+"/api/chats/user/"+clerkUserId);
        return response.data
    } catch (error) {
        console.log(error);   
        return []
    }
}


export const createChat = async (clerkUserId:string, chatId:string, prompt:string, model:ModelEnum , systemPrompt:string , webSearch:boolean ) : Promise<CreateChatResponse> => {
    try {
        const response = await axios.post(BACKEND_URL+"/api/chat",{
            clerkUserId,chatId,prompt,model,systemPrompt,webSearch
        });
        return response.data
    } catch (error) {
        console.log(error);   
        return {chatId,response:JSON.stringify(error)}
    }
}
