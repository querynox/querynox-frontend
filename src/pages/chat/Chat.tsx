import { useNavigate, useParams } from "@tanstack/react-router"
import { useSidebar } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ui/chat-sidebar";
import HeadBar from "@/components/ui/HeadBar";
import { newChatDefaultObject, useChatContext } from "@/contexts/ChatContext";
import { useEffect, useState, useRef} from "react";
import { useUser, SignedOut } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import SignInOverlay from "@/components/ui/SignInOverlay";
import { cn } from "@/lib/utils";
import { Paperclip,X,Send, Earth } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
import Conversation from "@/components/ui/Conversation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createChatMutationOptions, createGetUserChatsQueryOptions } from "./apis/options";
import type { Chat, CreateChatInput, CreateChatResponse } from "@/data/types";
const Chat = () => {

  const { open, isMobile } = useSidebar()
  const { chatId } = useParams({ strict: false})
  const { chats, setChats, setActiveChatIndex, activeChatIndex, newChat,setNewChat } = useChatContext()
  const { isLoaded,user } = useUser()
  const navigate = useNavigate()

  const { refetch }  = useQuery(createGetUserChatsQueryOptions(user?.id));
  const { mutate } = useMutation(createChatMutationOptions(
    (data) => {handleSuccessfulMutation(data)},
    (error) => {console.log(error)}
  ))

  const [activeModel, setActiveModel] = useState<string>(newChatDefaultObject.model)
  const [prompt, setPrompt] = useState<string>("")
  const [isThinking,setIsThinking] = useState<boolean>(false); 

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatId) {
      const index = chats.findIndex((chat) => chat._id === chatId);
      if (index !== -1) {
        setActiveChatIndex(index);
      }else{
        navigate({to:"/chat"})
      }
    }
  }, [chatId, chats]);

  useEffect(()=>{
    if(user)
      refetchChats()
  },[user])

    
  const refetchChats = async (isNewChat?:boolean, files?:File[]) => {
    if(user){
        const { data } = await refetch();
        if(data){
          setChats((_prevChats) => {
            const tempChats = [...data.map((chat) =>  { 
              const _chat: Chat | undefined = _prevChats.find(_c => _c._id == chat._id);
              return { ...chat, files: _chat !== undefined ? _chat.files : [] };
            })]
            if(isNewChat && files){
              tempChats[0].files = files;
            }
            return tempChats
          })

        }
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
        updatedFiles.splice(index, 1); // Correct usage

        const updatedChat = {
          ...uChats[activeChatIndex],
          files: updatedFiles,
        };

        uChats[activeChatIndex] = updatedChat; // Correct index
        return uChats;
      });
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

  const handleSuccessfulMutation = async (data:CreateChatResponse) => {

    if(data.isError){
      console.error(data.error.message)
      setIsThinking(false);
      return;
    }

    if(activeChatIndex<0){

      await refetchChats(true,newChat.files)
      navigate({ to: "/chat/$chatId", params: { chatId: data.chat._id } });
      resetNewChatDefault();

    }else{

      setChats((prev) => {
        const temp = [...prev];
        const chatIndex = temp.findIndex((chat) => data.chat._id === chat._id);
        if (chatIndex === -1) return prev;

        const temp_chat = { ...temp[chatIndex] };
        temp_chat.messages = [...temp_chat.messages,{
          _id: "TEMP "+Date.now().toString(),
          content: data.response,
          role: "assistant",
        }]
        temp[chatIndex] = temp_chat;
        return [...temp];
      });

    }

    setIsThinking(false);
  }

  const sendChat = async () => {
    
    if (isThinking || !prompt.trim() || !user) return;
    const _prompt = prompt;
    setPrompt("");
    setIsThinking(true);

    let chat : CreateChatInput = {
      clerkUserId:"",
      chatId:"",
      prompt:_prompt,
      model:"",
      systemPrompt:"",
      webSearch:false,
      files:[]
    }

    if(activeChatIndex>=0){

      setChats((prev) => {
        const temp = [...prev];
        const temp_chat = { ...temp[activeChatIndex] };
        temp_chat.messages = [...temp_chat.messages,{
          _id: "TEMP "+Date.now().toString(),
          content: prompt,
          role: "user",
        }]
        temp[activeChatIndex] = temp_chat;
        return [...temp];
      });

      chat.clerkUserId=user.id,
      chat.chatId=chats[activeChatIndex]._id,
      chat.model=chats[activeChatIndex].model,
      chat.systemPrompt=chats[activeChatIndex].systemPrompt,
      chat.webSearch=chats[activeChatIndex].webSearch
      chat.files=chats[activeChatIndex].files
      
    }else{

      chat.clerkUserId=user.id,
      chat.chatId=newChat._id,
      chat.model=newChat.model,
      chat.systemPrompt=newChat.systemPrompt,
      chat.webSearch=newChat.webSearch
      chat.files=newChat.files

      setNewChat((prev)=>{
        return {...prev,messages:[{_id:"temp",content:prompt,role:"user"}]}
      })

    }

    mutate(chat);
  };

  const resetNewChatDefault = () => {
    setNewChat(newChatDefaultObject)
    setActiveModel(newChatDefaultObject.model)
  }

  return (
    !isLoaded ? <div className="w-screen h-screen flex justify-center items-center text-accent-foreground"> <Spinner className="size-14"/> </div> :
    <div className={` ${isMobile ? "ml-0": open ? "ml-[16rem]" : "ml-[3rem]"} transition-all h-screen flex flex-col text-accent-foreground`} >

        {/** Sign in Overlay if user is not signed in. */}
        <SignedOut>
          <SignInOverlay />
        </SignedOut>

        {/** Sidbar */}
        <ChatSidebar/>
      
        {/** Headbar */}
        <HeadBar activeModel={activeModel} setActiveModel={setActiveModel}/>

        {/** Body */}
        <div className="flex flex-col flex-1 bg-grey-200 rounded-lg overflow-hidden">

          {/** Chat / Conversations */}
          
          <div className="flex-1 overflow-y-auto p-6 px-[16vw] hide-scrollbar bg-grey-50 thin-scrollbar mt-2 pt-1 transition-none ">
            { activeChatIndex>=0 ? 
              chats[activeChatIndex].messages.length > 0 && <Conversation activeMessages={chats[activeChatIndex].messages } isThinking={isThinking}/> : 
              newChat.messages.length > 0 ?  <Conversation activeMessages={newChat.messages } isThinking={isThinking}/> :
              <div className="flex justify-center items-center flex-col h-full">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.fullName} 👋</h2>
                <p className="text-muted-foreground">Start a new conversation or revisit your recent work.</p>
              </div>}
          </div>

          {/* Input always at bottom */}
          <div className=" flex flex-col pt-2 px-[16vw] pb-6 items-start">
            <div className="rounded-md border border-input w-full dark:bg-primary-foreground bg-primary-foreground">

              {/**Attached Files*/}
              {((activeChatIndex < 0 && newChat.files.length>0 ) || (activeChatIndex >= 0 && chats[activeChatIndex].files.length > 0))  && <div className="flex gap-y-[2px] flex-col w-full pt-2 pl-4 dark:bg-primary-foreground rounded-t-md">
                {(activeChatIndex < 0 ? newChat.files : chats[activeChatIndex].files ).map((file,index) => <span className="flex items-center text-sm gap-x-1 italic" key={index}>{file.name} <X onClick={()=> {deleteFromFile(index)}} size={14} color="brown" className="cursor-pointer mt-1"/> </span> )}
              </div>}

              {/**Input Bar with Attachment and Send */}
              <div className="flex w-full items-top justify-around">


                <div onClick={handleAttachmentButtonClick} className="p-[15px] pr-2 pl-4 opacity-70 hover:opacity-100 cursor-pointer flex">
                  <input type="file" className="hidden" accept="*/*" multiple ref={fileInputRef} onChange={handleFileChange}/> 
                  <Paperclip/>
                </div>

                <div onClick={toggleWebSearch} className="p-[15px] px-2 opacity-70 hover:opacity-100 cursor-pointer flex">
                  <Earth className={(activeChatIndex<0 && newChat.webSearch) || (activeChatIndex>=0 && chats[activeChatIndex].webSearch) ? "stroke-blue-700 dark:stroke-blue-500" : "" }/>
                </div>
                
                <TextareaAutosize
                  placeholder="Start typing"
                  minRows={1}
                  maxRows={10}
                  onKeyDown={(e) => { if (e.key == "Enter" && !e.shiftKey ) {e.preventDefault();sendChat()} }}
                  value={prompt}
                  onChange={(event) => {setPrompt(event.target.value)}}
                  className={cn(
                    "placeholder:text-muted-foreground",
                    "flex w-full min-w-0 rounded-r-md bg-transparent p-2 my-4 md:text-[16px] transition-[color,box-shadow] outline-none",
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

        </div>
    </div>
  )
}



export default Chat;
