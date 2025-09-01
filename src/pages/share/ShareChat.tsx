import { useParams } from '@tanstack/react-router'
import useQueryPublicChat from './apis/queries/useQueryPublicChat'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useSystemContext } from '@/contexts/SystemContext'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import useQueryModels from '../chat/apis/queries/useQueryModels'
import type { ChatQueryType } from '@/data/types'
import { Check, Copy, Download } from 'lucide-react'

const ShareChat = () => {
  const params = useParams({ from: '/share/$chatId' })
  const { data, isLoading } = useQueryPublicChat(params.chatId)
  const { data: models  } = useQueryModels();
  const { darkmode } = useSystemContext()
  
  const [copid, setCopid] = useState<number>(-1)

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center h-screen"><div className='spinner-loader mx-4 my-2 p-1'></div></div>
    )
  }

    const handleClickCopy = (message:string, index:number) => {
      setCopid(index);
      setTimeout(()=>{setCopid(-1)},700)
      navigator.clipboard.writeText(message)
    }
  
    const isChatQueryImage = (chatQuery?:ChatQueryType) : boolean => {
      if(!chatQuery) chatQuery = data.chatQueries[data.chatQueries.length-1];
      if(!models) return false;
      return models.find(m => m.name == chatQuery.model)?.category == "Image Generation" || false;
    }
  

 return (
    <div className="flex-1 overflow-y-auto min-[650px]:p-6 min-[500px]:p-4 min-[400px]:p-[14px] min-[350px]:p-[12px] p-3 overflow-x-hidden bg-grey-50 thin-scrollbar mt-2 pt-1 transition-none">
      <div className='min-[590px]:max-w-[800px] min-[590px]:w-full min-[200px]:w-full mx-auto'>
       
        <div className="flex flex-col items-start w-full mb-5">
          <h1 className="text-2xl font-semibold mb-2">{data.title}</h1>
          <div className="text-sm text-muted-foreground mb-4">Shared chat (read-only)</div>
        </div>

        {data.chatQueries.map((query, index)=><div  key={index + query._id}>
        
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

          {/**Assistant Chat */}
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
              <button  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 cursor-copy ml-1"  onClick={()=>handleClickCopy(query.response,index)} title="Copy message">
                {copid == index ? <Check className="w-4 h-4 text-green-500 mr-0.5" /> : <Copy className="w-4 h-4 mr-0.5" />}
                Copy
              </button>
              :<button className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white" title="Download Image">
                  <a className='flex items-center gap-1' href={query.meta?.downloadUrl || query.response} download><Download className="w-4 h-4 mr-0.5" />Download</a>
              </button>}
              
            </div>

          </div>

        </div>)}

      </div>
    </div>)
}

export default ShareChat
