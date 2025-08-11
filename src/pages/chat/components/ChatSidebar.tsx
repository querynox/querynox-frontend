import { MessageSquarePlus ,MessageSquare } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
import { Separator } from "../../../components/ui/separator";
import { cn } from "@/lib/utils";
import type { ChatType } from "@/data/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import useDeleteChat from "../apis/mutations/useMutationDeleteChat";

export function ChatSidebar() {

  const {chats,setActiveChatIndex,activeChatIndex, setChats} = useChatContext();
  const {user} = useUser();
  const deleteChatMutation = useDeleteChat();
  

  const handleDelete = (chat:ChatType) => {
    deleteChatMutation.mutate({chatId:chat._id, clerkUserId:user!.id});
    setChats((prev)=>{
      const _chats = prev.filter(pchat => pchat._id != chat._id);
      return [..._chats];
    })
  }
  
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
                  <SidebarMenuButton asChild className={cn("my-[0.7px]",activeChatIndex < 0 ? "bg-accent/30" : "" )}>
                    <Link to={`/chat`} onClick={() => setActiveChatIndex(-1)}>
                      <MessageSquarePlus/>
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
                  <SidebarMenuButton asChild className={cn("my-[0.7px]",index == activeChatIndex ? "bg-accent/40" : "" )}>
                    <div className="flex justify-start items-center group/messages gap-0">
                      <Link to={`/chat/$chatId`} params={{chatId:chat._id}} onClick={() => {setActiveChatIndex(index)}} className="flex justify-start items-center gap-2 transition-all duration-300">
                        <MessageSquare size={"18px"}/>
                        <span className="truncate w-[193px] group-hover/messages:w-[168px] inline-block transition-all duration-300" title={chat.title}>{chat.title}</span>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <svg viewBox="0 0 40 20" className=" group-hover/messages:block justify-center items-center opacity-60 fill-accent-foreground hover:opacity-100 cursor-pointer" onClick={()=>{}}>
                        <circle cx="5" cy="10" r="5"/>
                        <circle cx="20" cy="10" r="5" />
                        <circle cx="35" cy="10" r="5" />
                            </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start" side="right">
                          <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                            <DropdownMenuItem >Option 1</DropdownMenuItem>
                            <DropdownMenuItem >Option 2</DropdownMenuItem>
                            <DropdownMenuItem >Option 3</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                            <AlertDialog>
                              <AlertDialogTrigger className="w-full text-start">Delete Chat</AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your chat and all conversations.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={()=>handleDelete(chat)} className="hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400">Delete!</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

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
                <span className="text-nowrap ml-2">{user?.fullName}</span>
            </SignedIn>
          </div>
      </SidebarFooter>
    </Sidebar>
  )
}