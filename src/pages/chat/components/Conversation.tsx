import type { ChatQuery } from '@/data/types'
import { Check, ClipboardCopy, Save } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Skeleton } from '../../../components/ui/skeleton';
import { useChatContext } from '@/contexts/ChatContext';
import useQueryModels from '@/pages/chat/apis/queries/useQueryModels';
import { useUser } from '@clerk/clerk-react';
import useQueryMessages from '../apis/queries/useQueryMessages';

import '@uiw/react-markdown-preview/markdown.css';

import { useSystemContext } from '@/contexts/SystemContext';

const Conversation = () => {

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [copid, setCopid] = useState<number>(-1)
  
  const { data: models  } = useQueryModels();
  const { activeChat, activeChatIndex, setChats, streamingResponse } = useChatContext();
  const { darkmode } = useSystemContext()
  const { user } = useUser();
  const { data } = useQueryMessages(activeChat._id);

  useEffect(() => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.chatQueries.length]);

  useEffect(()=>{
    if(activeChatIndex>=0 && data){
      setChats(prev => {
        const _chats = [...prev]
        _chats[activeChatIndex] = {..._chats[activeChatIndex],...data}
        return _chats;
      })
    }
  },[data])

  const handleClickCopy = (message:string, index:number) => {
    setCopid(index);
    setTimeout(()=>{setCopid(-1)},700)
    navigator.clipboard.writeText(message)
  }

  const isChatQueryImage = (chatQuery?:ChatQuery) : boolean => {
    if(!chatQuery) chatQuery = activeChat.chatQueries[activeChat.chatQueries.length-1];
    if(!models) return false;
    return models.find(m => m.name == chatQuery.model)?.category == "Image Generation" || false;
  }

  if( activeChatIndex < 0 && activeChat.chatQueries.length==0) 
    return (<div className="flex justify-center items-center flex-col h-full">
      <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.fullName} 👋</h2>
      <p className="text-muted-foreground">Start a new conversation or revisit your recent work.</p>
    </div>)

  return <div className="flex-1 overflow-y-auto p-6 px-[16vw] hide-scrollbar bg-grey-50 thin-scrollbar mt-2 pt-1 transition-none">
    {activeChat.chatQueries.length>0 ? <>
      {activeChat.chatQueries.map((query, index)=><div  key={index + query._id}>
      
        {/**User Chat */}
        <div className="flex justify-end">

          {/* Bubble Container */}
          <div className="relative group max-w-[85%] px-4 p-2 mb-2">

            <MarkdownPreview
              source={query.prompt}
              className="rounded-lg p-3 mb-2 markdown-preview"
              style={{
                backgroundColor: "var(--markdown-user-background)",
                color: "var(--markdown-user-text)",
              }}
              wrapperElement={{ "data-color-mode": darkmode ? "dark" : "light" }}
            />       

          </div>
                
        </div>

        {/**Assistant Chat */}
        {query.response 
        ?<div className="flex justify-start">

          {/* Bubble Container */}
          <div className="relative group max-w-[85%] px-4 p-2 mb-2">

            <MarkdownPreview
              source={isChatQueryImage(query) ?
                 `<img src="${query.response}" alt="${query.prompt}" loading="lazy" style="width: 400px; aspect-ratio: 1/1; background-color: #222; object-fit: cover; border-radius: 8px;" />` 
                 : query.response}
              className={isChatQueryImage(query) ?"rounded-lg mb-2 markdown-preview":"rounded-lg p-3 mb-2 markdown-preview"}
              style={{
                backgroundColor:"var(--markdown-assistant-background)",
                color:"var(--markdown-assistant-text)"
              }}
              wrapperElement={{ "data-color-mode": darkmode ? "dark" : "light" }}
            /> 
          
            {/* Copy Button / Save Button */}
            {!isChatQueryImage(query) ?
            <button  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 cursor-copy"  onClick={()=>handleClickCopy(query.response,index)} title="Copy message">
              {copid == index ? <Check className="w-4 h-4 text-green-500" /> : <ClipboardCopy className="w-4 h-4" />}
              Copy
            </button>
            :<a href={query.response} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 cursor-pointer" title="Open image in new tab">
                <Save className="w-4 h-4" />
                Open & Save
            </a>}
            
          </div>

        </div>

        /**Assistant Chat Stream*/
        : streamingResponse.trim()?
        <div className="flex justify-start">

          {/* Bubble Container */}
          <div className="relative group max-w-[85%] px-4 p-2 mb-2">

            <MarkdownPreview
              source={ streamingResponse.trim() }
              className="rounded-lg p-3 mb-2 markdown-preview"
              style={{
                backgroundColor:"var(--markdown-assistant-background)",
                color:"var(--markdown-assistant-text)"
              }}
              wrapperElement={{ "data-color-mode": darkmode ? "dark" : "light" }}
            /> 

            
          </div>

        </div>

        /**Assistant Chat loader*/
        :<div className="flex justify-start">
          {isChatQueryImage(query) ? <Skeleton className='size-[400px]  mx-4'/> : <div className='dots-loader mx-4 my-2 p-1'></div> }
        </div>}

        <div ref={scrollContainerRef} />

      </div>)}

    </>
    : <div className="flex justify-center items-center h-full"><div className='spinner-loader mx-4 my-2 p-1'></div></div>}
    </div>
  }

export default Conversation