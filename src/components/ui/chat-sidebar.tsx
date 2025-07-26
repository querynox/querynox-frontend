import { MessageSquarePlus ,MessageSquare } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SignedIn, UserButton , useUser} from "@clerk/clerk-react"
import { Link } from "@tanstack/react-router";
import { useChatContext } from "@/contexts/ChatContext";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

export function ChatSidebar() {
  const {chats,setActiveChatIndex,activeChatIndex} = useChatContext();
  const {user} = useUser();
  return (
    <Sidebar collapsible="icon" className="">

      <SidebarHeader className="pt-4 mb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex justify-between h-max">
              <h2 className="group-data-[state=collapsed]:hidden group-data-[state=expanded]:text-2xl transition-all ml-2">Chats</h2>
              <SidebarTrigger className="h-8 ml-[2px] scale-125"/>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent >

        <SidebarGroup className="my-0 pt-2">
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={`/chat`} onClick={() => setActiveChatIndex(-1)}>
                      <MessageSquarePlus />
                      <span>New Chat</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        

        {chats.length > 0 && <SidebarGroup className="mt-0 py-0 overflow-hidden group-data-[state=expanded]:pr-0">
          <SidebarGroupLabel className="">Previous Chats</SidebarGroupLabel>
          <SidebarGroupContent className="h-full overflow-auto group-data-[state=collapsed]:overflow-clip ml-0 thin-scrollbar pr-3">
            <SidebarMenu>
              {chats.map((chat,index)=>
                <SidebarMenuItem key = {index+chat._id}>
                  <SidebarMenuButton asChild className={cn("my-[0.7px]",index ==activeChatIndex ? "bg-accent" : "" )}>
                    <Link to={`/chat/$chatId`} params={{chatId:chat._id}} onClick={() => {setActiveChatIndex(index)}}>
                      <MessageSquare />
                      <span>{chat.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )} 

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>}

      </SidebarContent>
      
      <Separator/>

      <SidebarFooter className="pb-4 overflow-x-hidden">
          <div className="flex flex-1 overflow-auto justify-left items-center gap-2 overflow-x-hidden pt-1 pl-[2px]">
            <SignedIn>
                <UserButton />
                <span className="text-nowrap">{user?.fullName}</span>
            </SignedIn>
          </div>
      </SidebarFooter>
    </Sidebar>
  )
}