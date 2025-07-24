import { Link, useParams } from "@tanstack/react-router"
import { useSidebar } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ui/chat-sidebar";
import { chatIdRoute } from "@/router/routes/chatid.route";

const Chat = () => {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
  
    const { chatId } = useParams({ from: chatIdRoute.id });

  return (
    <div className={` ${open ? "ml-[16rem]" : "ml-[3rem]"} transition-all p-4`} >
        <ChatSidebar/>
        
        <div className="block"><Link to="/">Go to Home</Link></div>

   <div>Chat ID is: {chatId}</div>

    </div>
  )
}



export default Chat