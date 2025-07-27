import type { Message } from '@/data/types'
import { cn } from '@/lib/utils'
import { Check, ClipboardCopy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';

type ConversationPropType = {
  activeMessages:Message[];
  isThinking:boolean;
}

const Conversation = ({activeMessages, isThinking}:ConversationPropType) => {
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
                      className="rounded-lg p-2 mb-2 whitespace-pre-wrap"
                      style={{
                        backgroundColor: message.role === "user" ? "var(--markdown-user-background)" : "var(--markdown-assistant-background)",
                        color: message.role === "user" ? "var(--markdown-user-text)" : "var(--markdown-assistant-text)",
                      }}
                    />       

                    {/* Czpy Button */}
                    <button  className={cn("text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 cursor-copy", message.role === "user" ? "ml-auto":"mr-auto")}  onClick={()=>handleClickCopy(message.content,index)} title="Copy message">
                      {copid == index ? <Check className="w-4 h-4 text-green-500" /> : <ClipboardCopy className="w-4 h-4" />}
                      Copy
                    </button>

                  </div>
                  
                </div>})}

                {/* Thinking */}
                {isThinking && <div className="flex justify-start">
                  <div className="relative group max-w-[70%] px-4 py-2 mb-2">
                    <div className="rounded-lg px-4 py-2 mb-2 whitespace-pre-wrap bg-secondary dark:text-white">
                      thinking . . .
                    </div>
                  </div>
                </div>}

                 <div ref={messagesEndRef} />

        </>)
  }

export default Conversation