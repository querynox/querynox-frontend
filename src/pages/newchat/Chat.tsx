import { SignedIn, UserButton } from "@clerk/clerk-react"
import { Link, useParams } from "@tanstack/react-router"
import {SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ui/chat-sidebar";

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
  

  return (
    <div className={` ${open ? "ml-[16rem]" : "ml-[3rem]"} transition-all p-4`} >
        <ChatSidebar/>
        
        <div className="block"><Link to="/">Go to Home !</Link></div>

    </div>
  )
}



export default Chat