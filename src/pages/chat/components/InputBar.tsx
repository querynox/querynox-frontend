import { newChatDefaultObject, useChatContext } from '@/contexts/ChatContext';
import type { ChatType, ChatQueryType, CreateChatInputType, CreateChatOutputType, ModelType } from '@/data/types';
import { cn } from '@/lib/utils';
import { X, Paperclip, Earth, Send, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import useMutationChat from '../apis/mutations/useMutationChat';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from '@tanstack/react-router';
import useQueryModels from '../apis/queries/useQueryModels';
import { useStreamSSE } from '../apis/fetch/streamSSE';
import { generateUUID } from '@/utils/uuid';
import { useUserContext } from '@/contexts/UserContext';
import { useSignInOverlay } from '@/hooks/useGetProOverlay';

const InputBar = () => {  
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputPromptRef = useRef<HTMLTextAreaElement>(null);

  const { openOverlay } = useSignInOverlay()

  const { activeChat, activeChatIndex, setNewChat, setChats, setActiveChatIndex, newChat, setStreamingResponse, setChatStatus, setChatError } = useChatContext();
  const { mutate } = useMutationChat(
    (data)=>handleSuccessfulMutation(data),
    (error) => {
      console.log(error)
        if(error.chatid != "") setNewChat(newChatDefaultObject);
        setChatStatus({chatid:"",content:""})
        setStreamingResponse({chatid:"",content:""})
        setChatError({chatid:error.chatid, content:error.error})
    }
  );
  const { data: models  } = useQueryModels();
  const { user } = useUser();
  const {user:userInfo} = useUserContext()
  const navigate = useNavigate();
  const streamSSE = useStreamSSE();

  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [groupedModels, setGroupedModels] = useState<Record<string, ModelType[]>>();
  const modelDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(fileInputRef.current)
    fileInputRef.current.value = "";
  },[activeChatIndex]);

  useEffect(()=>{
    if(models)
    setGroupedModels(generateGroupedModels(models));
  },[models])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node)) {
        setIsModelDropdownOpen(false);
      }
    };

    if (isModelDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModelDropdownOpen]);
  
  const generateGroupedModels = (models:ModelType[]) :  Record<string, ModelType[]> => { 
    return models.reduce((acc, model) => {
      const category = model.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(model);
      return acc;
    }, {} as Record<string, typeof models>)
  }

  const changeSelectedModel = (model:ModelType) => {
    if(  !userInfo?.isPro && model.pro ){
      openOverlay()
      return;
    }
    if(activeChatIndex<0){
      setNewChat((chat) => {
        const uChat = {...chat,model:model.name};
        return uChat;
      })
    }else if(activeChatIndex >= 0 && activeChat){
      setChats(prev => {
        const chats = [...prev];
        const uChat = {...prev[activeChatIndex],model:model.name};
        chats[activeChatIndex] = uChat;
        return chats;
      })
    }
    setIsModelDropdownOpen(false);
  }

  const getModelLogo = (modelName: string) => {
    const lowerName = modelName.toLowerCase();
    if (lowerName.includes('gpt') || lowerName.includes('openai') || lowerName.includes('dall-e')) {
      return '/openai.svg';
    } else if (lowerName.includes('claude')) {
      return '/claude.png';
    } else if (lowerName.includes('gemini')) {
      return '/geminimodel.webp';
    } else if (lowerName.includes('meta') || lowerName.includes('llama')) {
      return '/meta svg.png';
    } else if (lowerName.includes('grok')){
      return '/grok.png';
    }
    return '/querynox.jpeg'; // default logo
  }

 
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

    if (!inputPromptRef.current || !inputPromptRef.current.value.trim() || !user || isThinking) {
      return;
    }
    const _prompt = inputPromptRef.current.value.trim()
    
    inputPromptRef.current.value = "";

    const chat : CreateChatInputType = {
      chatId:activeChat._id,
      prompt:_prompt,
      model:activeChat.model,
      systemPrompt:activeChat.systemPrompt,
      webSearch:activeChat.webSearch,
      files:activeChat.files
    }

    const chatQuery : ChatQueryType = {
      _id: generateUUID(),
      chatId: generateUUID(),
      model:activeChat.model,
      prompt:_prompt,
      response:"",
      systemPrompt:activeChat.systemPrompt,
      webSearch:activeChat.webSearch,
      createdAt:Date.now(),
      updatedAt:Date.now(),
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
            setChatStatus({chatid:response.chatId,content:response.message})
            break;
          case 'complete':
            await handleSuccessfulMutation({chatQuery:response.chatQuery,chat:response.chat})
            setStreamingResponse({chatid:"",content:""});
            setChatStatus({chatid:"",content:""})
            break;
          case 'metadata':
            //TODO:
            break;
          case 'error':
            if(response.chatId != "")  setNewChat(newChatDefaultObject);
            setChatStatus({chatid:"",content:""})
            setStreamingResponse({chatid:"",content:""})  
            setChatError({chatid:response.chatId,content:response.error})
            break;
          case 'content':
            setStreamingResponse(prev =>{ return {chatid:response.chatId,content:(prev.content + response.content)}})
            break;
        }
      },
      (error) => {
        if(error.chatid != "")  setNewChat(newChatDefaultObject);
        setChatStatus({chatid:"",content:""})
        setStreamingResponse({chatid:"",content:""})
        setChatError({chatid:error.chatid, content:error.error})
      }
    );

  }
  
  return (
  <div className="flex flex-col px-4 pb-4 items-center justify-center">
      <div className="flex-1 rounded-xl py-1 shadow-2xs border border-input max-w-[800px] w-full dark:bg-primary-foreground bg-primary-foreground">

        {/**Attached Files*/}
        {activeChat.files.length > 0 && <div className="flex flex-col w-full pt-2 pl-4 dark:bg-primary-foreground max-h-40 overflow-y-auto pr-2 thin-scrollbar">
          {activeChat.files.map((file,index) => <span className="flex items-center text-sm gap-x-1 italic break-words" key={index}><span className="truncate max-w-[400px]" title={file.name}>
          {file.name}
        </span> <X onClick={()=> {deleteFromFile(index)}} size={14} color="brown" className="cursor-pointer mt-1"/> </span> )}
        </div>}

        {/**Input Bar with Attachment and Send */}
        <div className="flex w-full items-top justify-around min-[350px]:min-h-[50px] min-[550px]:py-2.5 px-3 pt-2 ">


          <div onClick={handleAttachmentButtonClick} className="min-[480px]:px-2 px-1 opacity-70 hover:opacity-100 cursor-pointer flex " title="Attach files">
            <input type="file" className="hidden" accept="*/*" multiple ref={fileInputRef} onChange={handleFileChange}/> 
            <Paperclip className='size-[18px] min-[480px]:size-[24px]' />
          </div>

          <div onClick={toggleWebSearch} className="min-[480px]:px-2 px-1 opacity-80 hover:opacity-100 cursor-pointer flex"  title="Toggle Web Search">
            <Earth className={cn(activeChat.webSearch ? "stroke-black dark:stroke-white opacity-100" : "opacity-40" , "size-[18px] min-[480px]:size-[24px]")}/>
          </div>
          
          <TextareaAutosize
            placeholder="Start typing"
            minRows={1}
            maxRows={10}
            onKeyDown={(e) => { if (e.key == "Enter" && !e.shiftKey ) {e.preventDefault();sendChatStream()} }}
            ref={inputPromptRef}
            className={cn(
              "flex-1 relative -top-1 w-full min-w-0 h-0", // flex-1 grows & shrinks
              "placeholder:text-muted-foreground bg-transparent px-2 py-1 ",
              "text-sm md:text-base transition-[color,box-shadow] outline-none",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              "focus-visible:border-ring focus-visible:ring-ring/50",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              "thin-scrollbar resize-none"
            )}
          />

          {/* Model Selector */}
          <div className="relative" ref={modelDropdownRef}>
            <div 
               onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)} 
               className="min-[480px]:px-1.5 px-1 opacity-70 hover:opacity-100 cursor-pointer flex items-center gap-1 hover:bg-secondary/30 dark:hover:bg-secondary/20 rounded-lg py-1.5 transition-all duration-200 relative -top-1" 
               title="Select Model"
             >
                <img 
                  src={getModelLogo(activeChat.model)} 
                  alt={activeChat.model} 
                  className={cn(
                    "rounded-sm ml-2",
                    (activeChat.model.toLowerCase().includes('gpt') || activeChat.model.toLowerCase().includes('openai') || activeChat.model.toLowerCase().includes('dall-e') || activeChat.model.toLowerCase().includes('grok')) 
                      ? "dark:invert size-[18px] min-[480px]:size-[20px] min-[880px]:size-[22px]" 
                      : "size-[18px] min-[480px]:size-[20px] min-[880px]:size-[22px]"
                  )}
                />
              <ChevronDown className="size-[12px] min-[480px]:size-[14px]" />
            </div>
            
              {isModelDropdownOpen && (
               <div className="absolute bottom-full right-0 mb-2 w-80 max-h-96 overflow-y-auto bg-popover text-popover-foreground backdrop-blur-2xl border border-border rounded-2xl shadow-2xl z-50 ring-1 ring-ring/20 thin-scrollbar">
                {groupedModels && Object.keys(groupedModels).map((category) => (
                  <div key={category} className="p-2">
                     <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-2 bg-secondary/30 rounded-lg mb-2 backdrop-blur-sm border border-border">
                       {category}
                     </div>
                      {groupedModels[category].map((model) => (
                       <div
                         key={model.name}
                         onClick={() => changeSelectedModel(model)}
                         className={cn(
                           "flex items-center gap-3 px-3 py-2 hover:bg-secondary/40 dark:hover:bg-secondary/40 rounded-lg transition-all duration-200 hover:shadow-lg",
                           activeChat.model === model.name && "bg-primary/20 border border-primary/40 shadow-md",
                           !userInfo?.isPro && model.pro ? "opacity-40 cursor-help": "opacity-90 hover:scale-105 cursor-pointer"
                         )}
                       >
                        <img 
                          src={getModelLogo(model.name)} 
                          alt={model.name} 
                          className={cn(
                            "rounded-sm",
                            (model.name.toLowerCase().includes('gpt') || model.name.toLowerCase().includes('openai') || model.name.toLowerCase().includes('dall-e') || model.name.toLowerCase().includes('grok')) 
                              ? "dark:invert size-5" 
                              : "size-5"
                          )}
                          />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-black dark:text-gray-100">
                            {model.name}{model.pro && <span className='relative bottom-2 left-1 text-[10px]'>pro</span> }
                          </div>
                          <div className="text-xs text-gray-900 dark:text-gray-400 truncate">
                            {model.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="min-[480px]:px-2 px-1 opacity-70 hover:opacity-100 cursor-pointer"  title="Send Chat">
            <Send onClick={sendChatStream} className='size-[18px] min-[480px]:size-[24px]'/>
          </div>

        </div>

      </div>
    </div>
  )
}

export default InputBar