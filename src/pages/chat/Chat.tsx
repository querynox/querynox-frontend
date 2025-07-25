import { useParams } from "@tanstack/react-router"
import { useSidebar } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ui/chat-sidebar";
import HeadBar from "@/components/ui/HeadBar";
import { useChatContext } from "@/contexts/ChatContext";
import { useEffect, useState, useRef } from "react";
import { useUser, SignedOut } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import SignInOverlay from "@/components/ui/SignInOverlay";
import { cn } from "@/lib/utils";
import { Paperclip,X } from "lucide-react";

const Chat = () => {
  const { open, isMobile } = useSidebar()
  const { chatId } = useParams({ strict: false})
  const { chats, setChats, setActiveChatIndex, activeChatIndex, setNewChatFiles,newChatFiles } = useChatContext()
  const { isLoaded } = useUser()

  const [activeModel, setActiveModel] = useState<string>("")

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatId) {
      const index = chats.findIndex((chat) => chat._id === chatId);
      if (index !== -1) {
        setActiveChatIndex(index);
      }
    }
  }, [chatId, chats]);


  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const fileArray = Array.from(files);

    if (activeChatIndex < 0) {
      setNewChatFiles((prevFiles) => {
        const uniqueFiles = fileArray.filter(
          (newFile) =>
            !prevFiles.some(
              (existingFile) =>
                existingFile.name === newFile.name &&
                existingFile.size === newFile.size
            )
        );
        return [...prevFiles, ...uniqueFiles];
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
      setNewChatFiles((chatFiles) => {
        const files = [...chatFiles];
        files.splice(index, 1); // Remove only 1 item at `index`
        return [...files];
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

  return (
    !isLoaded ? <div className="w-screen h-screen flex justify-center items-center"> <Spinner className="size-14"/> </div> :
    <div className={` ${isMobile ? "ml-0": open ? "ml-[16rem]" : "ml-[3rem]"} transition-transform h-screen flex flex-col`} >

        {/** Sign in Overlay if user is not signed in. */}
        <SignedOut>
          <SignInOverlay />
        </SignedOut>

        {/** Sidbar */}
        <ChatSidebar/>
      
        {/** Headbar */}
        <HeadBar activeModel={activeModel} setActiveModel={setActiveModel}/>

        {/** Chat / Conversations */}
        <div className="flex flex-col flex-1 bg-grey-200 rounded-lg overflow-hidden">
        
          <div className="flex-1 overflow-y-auto p-6 px-44 space-y-0 hide-scrollbar bg-grey-50 thin-scrollbar mt-2 pt-1">
              {activeChatIndex>=0 && chats[activeChatIndex].messages.map((message, index)=>{
                  return <div key={index+message._id} className={cn("flex",message.role == "user" ? "justify-end" : "justify-start")}>
                    {message.content}
                    </div>
              })}
          </div>

          {/* Input always at bottom */}
          <div className=" flex flex-col pt-2 px-40 pb-6 items-start">

            <div className="rounded-md border border-input w-full">

              {((activeChatIndex < 0 && newChatFiles.length>0 ) || (activeChatIndex >= 0 && chats[activeChatIndex].files.length > 0))  && <div className="flex gap-0 flex-col w-full pt-2 pl-2">
                {(activeChatIndex < 0 ? newChatFiles : chats[activeChatIndex].files ).map((file,index) => <span className="flex items-center text-sm gap-x-1" key={index}>{file.name} <X onClick={()=> {deleteFromFile(index)}} size={14} color="red" className="cursor-pointer mt-1" /> </span> )}
              </div>}
              
              <div className="flex w-full justify-center">

                <div onClick={handleButtonClick} className="py-[15px] px-2 opacity-75 hover:opacity-100 cursor-pointer flex items-end">
                  <input type="file" className="hidden" accept="*/*" multiple ref={fileInputRef} onChange={handleFileChange}/> 
                  <Paperclip/>
                </div>
                
                <input type="text"
                    data-slot="input"
                    placeholder="Start typing"
                    className={cn(
                      "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-r-md bg-transparent px-2 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 ",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                      "h-14"
                    )}/>

              </div>
            </div>
          </div>

        </div>
    </div>
  )
}



export default Chat
