import { useParams } from "@tanstack/react-router"
import { useSidebar } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ui/chat-sidebar";
import HeadBar from "@/components/ui/HeadBar";
import { useChatContext } from "@/contexts/ChatContext";
import { useEffect, useState } from "react";
import { useUser, SignedOut, SignedIn } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import SignInOverlay from "@/components/ui/SignInOverlay";

const Chat = () => {
  const { open, isMobile } = useSidebar()
  const { chatId } = useParams({ strict: false})
  const { chats, setActiveChatIndex, activeChatIndex } = useChatContext()
  const { isLoaded } = useUser()

  const [activeModel, setActiveModel] = useState<string>("")

  useEffect(() => {
    if (chatId) {
      const index = chats.findIndex((chat) => chat._id === chatId);
      if (index !== -1) {
        setActiveChatIndex(index);
      }
    }
  }, [chatId, chats]);


  return (
    !isLoaded ? <div className="w-screen h-screen flex justify-center items-center"> <Spinner className="size-14"/> </div> :
    <div className={` ${isMobile ? "ml-0": open ? "ml-[16rem]" : "ml-[3rem]"} transition-all mt-4 overflow-hidden`} >

        {/** Sign in Overlay if user is not signed in. */}
        <SignedOut>
          <SignInOverlay />
        </SignedOut>

        {/** Sidbar */}
        <ChatSidebar/>
      
        {/** Headbar */}
        <HeadBar activeModel={activeModel} setActiveModel={setActiveModel}/>

        {/** Chat / Conversations */}
        <div className="mt-2 bg-amber-50 px-4 overflow-y-auto">
        
          {activeChatIndex < 0 ? 

            /** New Chat */
            <div>Start a new Chat</div> :

             /** Old Chat */
            <SignedIn>
              <div>Chat: {JSON.stringify(chats[activeChatIndex])}</div>
            </SignedIn>}
          

          {/** Show User Placeholder chats behind Signin Page Glass Effect */}
          <SignedOut>
            <div>Chat: {JSON.stringify(chats[activeChatIndex])}</div>
          </SignedOut>

        </div>
        


    </div>
  )
}



export default Chat