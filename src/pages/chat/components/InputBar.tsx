import { newChatDefaultObject, useChatContext } from '@/contexts/ChatContext';
import type { Chat, ChatQuery, CreateChatInput, CreateChatOutput } from '@/data/types';
import { cn } from '@/lib/utils';
import { X, Paperclip, Earth, Send } from 'lucide-react';
import { useEffect, useRef } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import useMutationChat from '../apis/mutations/useMutationChat';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from '@tanstack/react-router';

const InputBar = () => {  
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputPromptRef = useRef<HTMLTextAreaElement>(null);

  const { activeChat, activeChatIndex, setNewChat, setChats, setActiveChatIndex, newChat } = useChatContext();
  const { mutate } = useMutationChat((data)=>handleSuccessfulMutation(data));
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(()=>{
    if(fileInputRef.current)
    fileInputRef.current.value = "";
  },[activeChatIndex]);

 
  const deleteFromFile = (index: number) => {
    if (activeChatIndex < 0) {
      setNewChat((chat) => {
        const updatedFiles = [...chat.files];
        updatedFiles.splice(index, 1); 
        const updatedChat = {
          ...chat,
          files: updatedFiles,
        };
        return updatedChat;
      });
    } else {
      setChats((chats) => {
        const uChats = [...chats];
        const currentFiles = uChats[activeChatIndex].files || [];
        const updatedFiles = [...currentFiles];
        updatedFiles.splice(index, 1);

        const updatedChat = {
          ...uChats[activeChatIndex],
          files: updatedFiles,
        };

        uChats[activeChatIndex] = updatedChat;
        return uChats;
      });
    }
  };

  const handleAttachmentButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      if (activeChatIndex < 0) {
        setNewChat((prevChat) => {

          const uniqueFiles = fileArray.filter(
            (newFile) =>
              !prevChat.files.some(
                (existingFile) =>
                  existingFile.name === newFile.name &&
                  existingFile.size === newFile.size
              )
          );

          return {...prevChat, files:uniqueFiles};
        });
      } else {
        setChats((chats) => {
          const updatedChats = [...chats];
          const currentFiles = updatedChats[activeChatIndex].files || [];

          const uniqueFiles = fileArray.filter(
            (newFile) =>
              !currentFiles.some(
                (existingFile) =>
                  existingFile.name === newFile.name &&
                  existingFile.size === newFile.size
              )
          );

          const updatedChat = {
            ...updatedChats[activeChatIndex],
            files: [...currentFiles, ...uniqueFiles],
          };

          updatedChats[activeChatIndex] = updatedChat;
          return updatedChats;
        });
      }
    }
  };
  
  const toggleWebSearch = () => {
    if(activeChatIndex<0){
      setNewChat(prevChat => {
        return {...prevChat, webSearch:!prevChat.webSearch}
      })
    }else{
      setChats(prevChats => {
        const newchats = [...prevChats]
        const newchat = {...prevChats[activeChatIndex],webSearch:!prevChats[activeChatIndex].webSearch}
        newchats[activeChatIndex] = newchat
        return newchats
      })
    }
  }

  const sendChat = async () => {
    const isThinking = activeChatIndex > 0 ? !!(activeChat.chatQueries[activeChat.chatQueries.length-1].response) : false;
    if (!inputPromptRef.current || !inputPromptRef.current.value.trim() || !user || isThinking) return;
    const _prompt = inputPromptRef.current.value.trim()
    
    inputPromptRef.current.value = "";

    const chat : CreateChatInput = {
      clerkUserId:user.id,
      chatId:activeChat._id,
      prompt:_prompt,
      model:activeChat.model,
      systemPrompt:activeChat.systemPrompt,
      webSearch:activeChat.webSearch,
      files:activeChat.files
    }

    mutate(chat);

    const chatQuery : ChatQuery = {
      _id:Date.now().toString(),
      chatId:Date.now().toString(),
      model:activeChat.model,
      prompt:_prompt,
      response:"",
      systemPrompt:activeChat.systemPrompt,
      webSearch:activeChat.webSearch,
      createdAt:Date.now(),
      updatedAt:Date.now()
    }

    if(activeChatIndex>=0){
      setChats((prev) => {
        const temp = [...prev];
        const temp_chat = { ...temp[activeChatIndex] };
        temp_chat.chatQueries = [...temp_chat.chatQueries,chatQuery]
        temp[activeChatIndex] = temp_chat;
        return [...temp];
      });
    }else{
      setNewChat((prev)=>{
        return {...prev,chatQueries:[chatQuery]}
      })
      console.log(newChat)
    }


  };
  
  const handleSuccessfulMutation = async (data:CreateChatOutput) => {

    if(activeChatIndex<0){
      
      setChats((prev) => {
        const _chatQuery = data.chatQuery;
        if(data.chat){
          const _chat : Chat =  {...data.chat, files:newChat.files, chatQueries:[_chatQuery]};
          const temp = [_chat,...prev];
          return temp;
        }else{
          return prev;
        }
      });

      setActiveChatIndex(0);
      navigate({to:"/chat/$chatId", params:{chatId:data.chatQuery.chatId}})
      setNewChat(newChatDefaultObject);
    }else{

      const _chatQuery = data.chatQuery;

      setChats((prev) => {
        const temp = [...prev];
        const chatIndex = temp.findIndex((chat) => _chatQuery.chatId === chat._id);
        if (chatIndex === -1) return prev;

        const chatQuery = temp[chatIndex].chatQueries.pop();
        if(!chatQuery)  return prev;

        temp[chatIndex] = {...temp[chatIndex] , chatQueries:[...temp[chatIndex].chatQueries,{...chatQuery,...data}]}

        return temp;
      });

    }
  }
  
  return (
  <div className="flex flex-col pt-2 px-[16vw] pb-6 items-start">
      <div className="rounded-lg pt-2 shadow-2xs border border-input w-full dark:bg-primary-foreground bg-primary-foreground">

        {/**Attached Files*/}
        {activeChat.files.length > 0 && <div className="flex gap-y-[2px] flex-col w-full pt-2 pl-4 dark:bg-primary-foreground">
          {activeChat.files.map((file,index) => <span className="flex items-center text-sm gap-x-1 italic" key={index}>{file.name} <X onClick={()=> {deleteFromFile(index)}} size={14} color="brown" className="cursor-pointer mt-1"/> </span> )}
        </div>}

        {/**Input Bar with Attachment and Send */}
        <div className="flex w-full items-top justify-around">


          <div onClick={handleAttachmentButtonClick} className="p-[15px] pr-2 pl-4 opacity-70 hover:opacity-100 cursor-pointer flex">
            <input type="file" className="hidden" accept="*/*" multiple ref={fileInputRef} onChange={handleFileChange}/> 
            <Paperclip/>
          </div>

          <div onClick={toggleWebSearch} className="p-[15px] px-2 opacity-70 hover:opacity-100 cursor-pointer flex">
            <Earth className={activeChat.webSearch ? "stroke-blue-700 dark:stroke-blue-500" : "" }/>
          </div>
          
          <TextareaAutosize
            placeholder="Start typing"
            minRows={1}
            maxRows={10}
            onKeyDown={(e) => { if (e.key == "Enter" && !e.shiftKey ) {e.preventDefault();sendChat()} }}
            ref={inputPromptRef}
            className={cn(
              "placeholder:text-muted-foreground",
              "flex w-full min-w-0  bg-transparent p-2 my-4 md:text-[16px] transition-[color,box-shadow] outline-none",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive thin-scrollbar resize-none pt-0"
            )}
          />

          <div className="p-[15px] pr-4 pl-2 opacity-70 hover:opacity-100 cursor-pointer">
            <Send onClick={sendChat}/>
          </div>

        </div>

      </div>
    </div>
  )
}

export default InputBar