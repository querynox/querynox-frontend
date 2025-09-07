import type { ChatQueryType } from '@/data/types'
import { Check, Copy, Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Skeleton } from '../../../components/ui/skeleton';
import { useChatContext } from '@/contexts/ChatContext';
import useQueryModels from '@/pages/chat/apis/queries/useQueryModels';
import { useUser } from '@clerk/clerk-react';
import useQueryMessages from '../apis/queries/useQueryMessages';

import '@uiw/react-markdown-preview/markdown.css';

import { useSystemContext } from '@/contexts/SystemContext';
import { cn } from '@/lib/utils';

const Conversation = () => {

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [copid, setCopid] = useState<number>(-1)
  
  const { data: models  } = useQueryModels();
  const { activeChat, activeChatIndex, setChats, streamingResponse,chatStatus, chatError } = useChatContext();
  const { darkmode } = useSystemContext()
  const { user } = useUser();
  const { data } = useQueryMessages(activeChat._id);

  useEffect(() => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.chatQueries]);

  useEffect(()=>{
    if(activeChatIndex>=0 && data){
      setChats(prev => {
        const _chats = [...prev]
        _chats[activeChatIndex] = {..._chats[activeChatIndex],...data}
        return _chats;
      })
    }
  },[data])

  useEffect(() => {
  }, [chatStatus]);

  const handleClickCopy = (message:string, index:number) => {
    setCopid(index);
    setTimeout(()=>{setCopid(-1)},700)
    navigator.clipboard.writeText(message)
  }

  const isChatQueryImage = (chatQuery?:ChatQueryType) : boolean => {
    if(!chatQuery) chatQuery = activeChat.chatQueries[activeChat.chatQueries.length-1];
    if(!models) return false;
    return models.find(m => m.name == chatQuery.model)?.category == "Image Generation" || false;
  }

  if( activeChatIndex < 0 && activeChat.chatQueries.length==0) 
    return (<div className="flex justify-center items-center flex-col h-full">
      <h2 className="text-2xl font-bold mb-2 px-10">Welcome back, {user?.fullName} 👋</h2>
      <p className="text-muted-foreground px-10">Start a new conversation or revisit your recent work.</p>
    </div>)

  return <div className="flex-1 overflow-y-auto min-[650px]:p-6 min-[500px]:p-4 min-[400px]:p-[14px] min-[350px]:p-[12px] p-3 overflow-x-hidden bg-grey-50 thin-scrollbar mt-2 pt-1 transition-none">
    {activeChat.chatQueries.length>0 ? <div className='min-[590px]:max-w-[800px] min-[590px]:w-full min-[200px]:w-full mx-auto'>
      {activeChat.chatQueries.map((query, index)=><div  key={index + query._id}>
      
        {/**User Chat */}
        <div className="flex justify-end mb-[6px] py-4">

          {/* Bubble Container */}
          <div className="relative group max-w-[85%] min-[500px]:px-4 min-[400px]:px-[14px] min-[350px]:px-[12px] px-2 mb-2">

            <MarkdownPreview
              source={query.prompt}
              className="rounded-lg p-2 mb-2 markdown-preview thin-scrollbar"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
              }}
              wrapperElement={{ "data-color-mode": darkmode ? "dark" : "light" }}
            />       

          </div>
                
        </div>

        {!chatError.content.trim() && chatStatus.content.trim() && (index == activeChat.chatQueries.length-1) && chatStatus.chatid == activeChat._id &&
          <div className={cn("relative group min-[500px]:px-4 min-[400px]:px-[14px] min-[350px]:px-[12px] px-2", isChatQueryImage(query) ? "max-w-full":"w-full")}>
            <div className='rounded-lg mb-2 breathing-text text-xl'>&nbsp;</div>
          </div>}

        {/**Assistant Chat */}
        {chatError.content.trim() && (index == activeChat.chatQueries.length-1) && chatError.chatid == activeChat._id?
         <div className="flex justify-start">

          {/* Bubble Container */}
          <div className={cn("relative group min-[500px]:px-4 min-[400px]:px-[14px] min-[350px]:px-[12px] px-2")}>
            <div className='rounded-lg p-3 mb-6 markdown-preview thin-scrollbar dark:bg-red-800/20 dark:text-red-400 bg-red-200/80 text-red-800'>{chatError.content.trim()}</div>
          </div>
        </div>
        
        :query.response?
        <div className="flex justify-start">

          {/* Bubble Container */}
          <div className={cn("relative group min-[500px]:px-4 min-[400px]:px-[14px] min-[350px]:px-[12px] px-2", isChatQueryImage(query) ? "max-w-full":"w-full")}>

            <MarkdownPreview
              source={isChatQueryImage(query) ?
                 `<img src="${query.response}" alt="${query.prompt}" loading="lazy" style="width: 400px; aspect-ratio: 1/1; background-color: #222; object-fit: cover; border-radius: 8px;" />` 
                 : query.response}
              className={isChatQueryImage(query) ?"rounded-lg mb-2 markdown-preview thin-scrollbar":"rounded-lg p-3 pl-0 mb-2 markdown-preview thin-scrollbar"}
              style={{
                backgroundColor:"var(--markdown-assistant-background)",
                color:"var(--markdown-assistant-text)",
              }}
              wrapperElement={{ "data-color-mode": darkmode ? "dark" : "light" }}
            /> 
          
            {/* Copy Button / Save Button */}
            {!isChatQueryImage(query) ?
            <button  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 cursor-copy ml-1 relative -top-2"  onClick={()=>handleClickCopy(query.response,index)} title="Copy message">
              {copid == index ? <Check className="w-4 h-4 text-green-500 mr-0.5" /> : <Copy className="w-4 h-4 mr-0.5" />}
              <span className="hidden sm:inline">Copy</span>
            </button>
            :<button className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white relative -top-2" title="Download Image">
                <a className='flex items-center gap-1' href={query.meta?.downloadUrl || query.response} download><Download className="w-4 h-4 mr-0.5" /><span className="hidden sm:inline">Download</span></a>
            </button>}
            
          </div>

        </div>

        /**Assistant Chat Stream*/
        :streamingResponse.content.trim() && streamingResponse.chatid == activeChat._id?
        <div className="flex justify-start">

          {/* Bubble Container */}
          <div className="relative group min-[500px]:px-4 min-[400px]:px-[14px] min-[350px]:px-[12px] px-2 w-full">

            <MarkdownPreview
              source={streamingResponse.content}
              className="rounded-lg p-3 pl-0 mb-2 markdown-preview thin-scrollbar"
              style={{
                backgroundColor:"var(--markdown-assistant-background)",
                color:"var(--markdown-assistant-text)",
              }}
              wrapperElement={{ "data-color-mode": darkmode ? "dark" : "light" }}
            /> 
            
          </div>

        </div>

        /**Assistant Chat loader*/
        : (index == activeChat.chatQueries.length-1) && <div className="flex justify-start">
          {isChatQueryImage(query) ? <Skeleton className='size-[400px]  mx-4'/> : <div className='dots-loader mx-4 my-2 p-1'></div> }
        </div>}

        <div ref={scrollContainerRef} />

      </div>)}

    </div>
    : <div className="flex justify-center items-center h-full"><div className='spinner-loader mx-4 my-2 p-1'></div></div>}
    </div>
  }

export default Conversation