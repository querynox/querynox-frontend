import { newChatDefaultObject, useChatContext } from '@/contexts/ChatContext';
import type { ChatType, ChatQueryType, CreateChatInputType, CreateChatOutputType } from '@/data/types';
import { cn } from '@/lib/utils';
import { X, Paperclip, Earth, Send } from 'lucide-react';
import { useEffect, useRef } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import useMutationChat from '../apis/mutations/useMutationChat';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from '@tanstack/react-router';
import { streamSSE } from '../apis/fetch/streamSSE';
import useQueryModels from '../apis/queries/useQueryModels';

const InputBar = () => {  
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputPromptRef = useRef<HTMLTextAreaElement>(null);

  const { activeChat, activeChatIndex, setNewChat, setChats, setActiveChatIndex, newChat, setStreamingResponse } = useChatContext();
  const { mutate } = useMutationChat((data)=>handleSuccessfulMutation(data));
  const { data: models  } = useQueryModels();
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
    const isThinking = activeChatIndex > 0 ? !(activeChat.chatQueries[activeChat.chatQueries.length-1].response) : false;
    if (!inputPromptRef.current || !inputPromptRef.current.value.trim() || !user || isThinking) return;
    const _prompt = inputPromptRef.current.value.trim()
    
    inputPromptRef.current.value = "";

    const chat : CreateChatInputType = {
      clerkUserId:user.id,
      chatId:activeChat._id,
      prompt:_prompt,
      model:activeChat.model,
      systemPrompt:activeChat.systemPrompt,
      webSearch:activeChat.webSearch,
      files:activeChat.files
    }

    mutate(chat);

    const chatQuery : ChatQueryType = {
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
        const prevChat = prev[activeChatIndex];
        const updatedChat = {
          ...prevChat,
          chatQueries: [...prevChat.chatQueries, chatQuery],
        };
        const updatedChats = [...prev];
        updatedChats[activeChatIndex] = updatedChat;
        return updatedChats;
      });
    }else{
      setNewChat((prev) => ({
        ...prev,
        chatQueries: [chatQuery],
      }));
    }
  };

  const handleSuccessfulMutation = async (data:CreateChatOutputType) => {

    if(activeChatIndex<0){
      
      setChats((prev) => {
        const _chatQuery = data.chatQuery;
        if(data.chat){
          const _chat : ChatType =  {...data.chat, files:newChat.files, chatQueries:[_chatQuery]};
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
        const _chats = [...prev];
        const _chat = {..._chats[activeChatIndex]};
        const _chatQuerys = _chat.chatQueries.filter((q) => q.response.trim() !== "");
        _chat.chatQueries = [..._chatQuerys, _chatQuery];

        _chats[activeChatIndex] = _chat;

        return _chats;
      });

    }
  }

  const sendChatStream = async () => {

    // If the model is for image generation, use Non Streaming sendChat
    if(models?.find((model => model.name === activeChat.model))?.category == "Image Generation"){
      sendChat();
      return;
    }

    const isThinking = activeChatIndex > 0 ? !(activeChat.chatQueries[activeChat.chatQueries.length-1].response) : false;

    if (!inputPromptRef.current || !inputPromptRef.current.value.trim() || !user || isThinking) return;
    const _prompt = inputPromptRef.current.value.trim()
    
    inputPromptRef.current.value = "";

    const chat : CreateChatInputType = {
      clerkUserId:user.id,
      chatId:activeChat._id,
      prompt:_prompt,
      model:activeChat.model,
      systemPrompt:activeChat.systemPrompt,
      webSearch:activeChat.webSearch,
      files:activeChat.files
    }

    const chatQuery : ChatQueryType = {
      _id: crypto.randomUUID(),
      chatId: crypto.randomUUID(),
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
        const chat = { ...temp[activeChatIndex], chatQueries: [...temp[activeChatIndex].chatQueries, chatQuery] };
        temp[activeChatIndex] = chat;
        return temp;
      });
    }else{
      setNewChat((prev)=>{
        return {...prev,chatQueries:[chatQuery]}
      })
    }

    await streamSSE(chat,
      async (response) => {
        switch (response.type) {
          case 'status':
            //console.log("Status:", response.message);
            break;
          case 'complete':
            await handleSuccessfulMutation({chatQuery:response.chatQuery,chat:response.chat})
            setStreamingResponse("");
            break;
          case 'metadata':
            //console.log(response);
            break;
          case 'error':
            //console.error("Server Error:", response.error);
            break;
          case 'content':
            setStreamingResponse(prev => prev + response.content)
            break;
        }
      },
      () => {
        //console.log("Streaming complete");
      },
      (error) => {
        console.error("Streaming failed:", error);
      }
    );

  }
  
  return (
  <div className="flex flex-col px-4 pb-4 items-center justify-center">
      <div className="flex-1 rounded-xl py-1 shadow-2xs border border-input max-w-[800px] w-full dark:bg-primary-foreground bg-primary-foreground">

        {/**Attached Files*/}
        {activeChat.files.length > 0 && <div className="flex gap-y-[2px] flex-col w-full pt-2 pl-4 dark:bg-primary-foreground">
          {activeChat.files.map((file,index) => <span className="flex items-center text-sm gap-x-1 italic" key={index}>{file.name} <X onClick={()=> {deleteFromFile(index)}} size={14} color="brown" className="cursor-pointer mt-1"/> </span> )}
        </div>}

        {/**Input Bar with Attachment and Send */}
        <div className="flex w-full items-top justify-around min-[350px]:min-h-[50px] p-3">


          <div onClick={handleAttachmentButtonClick} className="min-[480px]:px-2 px-1 opacity-70 hover:opacity-100 cursor-pointer flex">
            <input type="file" className="hidden" accept="*/*" multiple ref={fileInputRef} onChange={handleFileChange}/> 
            <Paperclip className='size-[18px] min-[480px]:size-[24px]'/>
          </div>

          <div onClick={toggleWebSearch} className="min-[480px]:px-2 px-1 opacity-70 hover:opacity-100 cursor-pointer flex">
            <Earth className={cn(activeChat.webSearch ? "stroke-blue-700 dark:stroke-blue-500" : "" , "size-[18px] min-[480px]:size-[24px]")}/>
          </div>
          
          <TextareaAutosize
            placeholder="Start typing"
            minRows={1}
            maxRows={10}
            onKeyDown={(e) => { if (e.key == "Enter" && !e.shiftKey ) {e.preventDefault();sendChatStream()} }}
            ref={inputPromptRef}
            className={cn(
              "placeholder:text-muted-foreground",
              "flex w-full min-w-0 bg-transparent px-2 md:text-[16px] transition-[color,box-shadow] outline-none",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive thin-scrollbar resize-none"
            )}
          />

          <div className="min-[480px]:px-2 px-1 opacity-70 hover:opacity-100 cursor-pointer">
            <Send onClick={sendChatStream} className='size-[18px] min-[480px]:size-[24px]'/>
          </div>

        </div>

      </div>
    </div>
  )
}

export default InputBar