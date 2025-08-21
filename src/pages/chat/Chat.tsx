import { useNavigate, useParams } from "@tanstack/react-router"
import { useSidebar } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/pages/chat/components/ChatSidebar";
import HeadBar from "@/pages/chat/components/HeadBar";
import { useChatContext } from "@/contexts/ChatContext";
import { useUserContext } from "@/contexts/UserContext";
import { useUser, SignedOut } from "@clerk/clerk-react";
import SignInOverlay from "@/pages/chat/components/SignInOverlay";
import Conversation from "@/pages/chat/components/Conversation";
import InputBar from "./components/InputBar";
import useQueryUserChats from "./apis/queries/useQueryUserChats";
import { useEffect } from "react";

import useQueryModels from "./apis/queries/useQueryModels";
import useQueryUserInfo from "./apis/queries/useQueryUserInfo";

const Chat = () => {

  const { open, isMobile } = useSidebar()
  const { chatId } = useParams({ strict: false})
  const { isLoaded : isUserLoaded ,user } = useUser()
  const { setUser } = useUserContext();
  const { setChats , setActiveChatIndex  } = useChatContext();
  const navigate = useNavigate();

  const { refetch : refetchUserChats, isFetching:isFetchingUserChats } = useQueryUserChats();
  const { isFetched:isModelFetched} = useQueryModels();
  const { refetch:refetchUserInfo , isFetching: isFetchingUserInfo } = useQueryUserInfo();

  useEffect(()=>{
    if(user?.id){
      loadUser();
    }
  },[user?.id])

  const loadUser = async () => {
    if(isFetchingUserChats || isFetchingUserInfo) return;
    const { data:chatData , isError:chatError} = await refetchUserChats();
    const { data:userData, error:userError} = await refetchUserInfo();

    if(!userData || !chatData || chatError || userError){
      navigate({to:"/chat"})
      return;
    }

    let aIndex = -1;

    setUser(userData)
    setChats((prev) => {
      const uChats = chatData.map((chat, index)=>{ 
        let _chat = prev.find(prev => prev._id == chat._id);
        if(chat._id === chatId) aIndex = index;
        return {...chat,files:_chat? _chat.files : [],chatQueries:[]}
      })
      return uChats
    })

    setActiveChatIndex(aIndex);
    if(aIndex==-1 && chatId){
      navigate({to:"/chat"})
    }
  }




  if (!isUserLoaded || !isModelFetched) return <div className="w-screen h-screen flex justify-center items-center text-accent-foreground"> <div className="size-14 spinner-loader"/> </div>;

  return (
    <div className={` ${isMobile ? "ml-0": open ? "ml-[16rem]" : "ml-[3rem]"} transition-transform h-screen flex flex-col text-accent-foreground w-full bg-background overflow-hidden`} >

        {/** Sign in Overlay if user is not signed in. */}
        <SignedOut>
          <SignInOverlay />
        </SignedOut>

        {/** Sidbar */}
        <ChatSidebar/>
      
        {/** Headbar */}
        <HeadBar/>

        {/** Body */}
        <div className="flex flex-col flex-1 bg-grey-200 rounded-lg overflow-hidden">

          {/** Chat / Conversations */}
          <Conversation /> 

          {/* Input always at bottom */}
          <InputBar/>

        </div> 

    </div>
  )
}


export default Chat;