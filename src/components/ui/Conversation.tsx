import type { Message } from '@/data/types'
import { cn } from '@/lib/utils'
import { Check, ClipboardCopy, Download, Save } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Skeleton } from './skeleton';

type ConversationPropType = {
  activeMessages:Message[];
  isThinking:boolean;
  isImage:boolean;
}

const Conversation = ({activeMessages, isThinking, isImage}:ConversationPropType) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [copid, setCopid] = useState<number>(-1)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages,isThinking]);

  const handleClickCopy = (message:string, index:number) => {
    setCopid(index);
    setTimeout(()=>{setCopid(-1)},700)
    navigator.clipboard.writeText(message)
  }

  return (<>
      {activeMessages.map((message, index)=>{
        return <div key={index + message._id} className={cn("flex",message.role === "user" ? "justify-end" : "justify-start")}>

                  {/* Bubble Container */}
                  <div className="relative group max-w-[85%] px-4 p-2 mb-2">
     
                    <MarkdownPreview
                      source={message.content}
                      className="rounded-lg p-4 mb-2 whitespace-pre-wrap"
                      style={{
                        backgroundColor: message.role === "user" ? "var(--markdown-user-background)" : "var(--markdown-assistant-background)",
                        color: message.role === "user" ? "var(--markdown-user-text)" : "var(--markdown-assistant-text)",
                      }}
                    />       
                    <div className={cn("flex gap-x-4", message.role === "user" ? "ml-auto":"mr-auto")}>
                    
                      {/* Copy Button */}
                      <button  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 cursor-copy"  onClick={()=>handleClickCopy(message.content,index)} title="Copy message">
                        {copid == index ? <Check className="w-4 h-4 text-green-500" /> : <ClipboardCopy className="w-4 h-4" />}
                        Copy
                      </button>

                      {/* Save Button */}
                      {message.imageUrl !== undefined &&  message.role == "assistant" &&
                        <a
                          href={message.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                          title="Open image in new tab"
                        >
                          <Save className="w-4 h-4" />
                          Open & Save
                        </a>}
                    
                    </div>

                  </div>
                  
                </div>})}

                {/* Thinking */}
                {isThinking && <div className="flex justify-start">
                  {isImage? <Skeleton className='size-[400px]'/> :<Skeleton className='w-[400px] h-[40px]'/> }

                </div>}

                 <div ref={messagesEndRef} />

        </>)
  }

export default Conversation