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

const chats = [
  { chatTitle: "Explain quantum computing in simple terms", chatId: "f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5" },
  { chatTitle: "Write a Python script for a simple web scraper", chatId: "a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6" },
  { chatTitle: "Brainstorm ideas for a fantasy novel", chatId: "b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7" },
  { chatTitle: "Draft a professional email to my manager", chatId: "c3d4e5f6-a7b8-c9d0-e1f2-a3b4c5d6e7f8" },
  { chatTitle: "Plan a 3-day itinerary for a trip to Paris", chatId: "d4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8a9" },
  { chatTitle: "Help me debug this JavaScript function", chatId: "e5f6a7b8-c9d0-e1f2-a3b4-c5d6e7f8a9b0" },
  { chatTitle: "Translate 'How are you?' to Japanese", chatId: "f6a7b8c9-d0e1-f2a3-b4c5-d6e7f8a9b0c1" },
  { chatTitle: "Create a vegetarian weekly meal plan", chatId: "a7b8c9d0-e1f2-a3b4-c5d6-e7f8a9b0c1d2" },
  { chatTitle: "Summarize the plot of Hamlet", chatId: "b8c9d0e1-f2a3-b4c5-d6e7-f8a9b0c1d2e3" },
  { chatTitle: "Explain quantum computing in simple terms", chatId: "c9d0e1f2-a3b4-c5d6-e7f8-a9b0c1d2e3f4" },
  { chatTitle: "Write a Python script for a simple web scraper", chatId: "d0e1f2a3-b4c5-d6e7-f8a9-b0c1d2e3f4a5" },
  { chatTitle: "Brainstorm ideas for a fantasy novel", chatId: "e1f2a3b4-c5d6-e7f8-a9b0-c1d2e3f4a5b6" },
  { chatTitle: "Draft a professional email to my manager", chatId: "f2a3b4c5-d6e7-f8a9-b0c1-d2e3f4a5b6c7" },
  { chatTitle: "Plan a 3-day itinerary for a trip to Paris", chatId: "a3b4c5d6-e7f8-a9b0-c1d2-e3f4a5b6c7d8" },
];

export function ChatSidebar() {
  const {user} = useUser();
  return (
    <Sidebar collapsible="icon" className="py-2">

      <SidebarHeader className="mb-1">
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

        <SidebarGroup className="my-0 py-0">
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={`/chat`}>
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
          <SidebarGroupContent className="h-full overflow-auto group-data-[state=collapsed]:overflow-clip ml-0 thin-scrollbar">
            <SidebarMenu>
              {chats.map((chat,index)=>
                <SidebarMenuItem key = {index+chat.chatId}>
                  <SidebarMenuButton asChild className="my-[0.7px]">
                    <Link to={`/chat/$chatId`} params={{chatId:chat.chatId}}>
                      <MessageSquare />
                      <span>{chat.chatTitle}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )} 

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>}

      </SidebarContent>

      <SidebarFooter>
          <div className="flex flex-1 overflow-auto items-center gap-2 overflow-x-hidden">
            <SignedIn>
                <UserButton />
            </SignedIn>
             <span className="text-nowrap">{user?.fullName}</span>
          </div>
      </SidebarFooter>
    </Sidebar>
  )
}