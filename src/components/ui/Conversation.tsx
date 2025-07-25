import type { Message } from '@/data/types'
import { cn } from '@/lib/utils'
import { ClipboardCopy } from 'lucide-react'
import { useEffect, useRef } from 'react'

type ConversationPropType = {
  activeMessages:Message[]
}

const Conversation = ({activeMessages}:ConversationPropType) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  return (<>
      {activeMessages.map((message, index)=>{
        return <div key={index + message._id} className={cn("flex",message.role === "user" ? "justify-end" : "justify-start")}>

                  {/* Bubble Container */}
                  <div className="relative group max-w-[70%] px-4 py-2 mb-2">

                    <div className={cn("rounded-lg px-4 py-2 mb-2 whitespace-pre-wrap", message.role === "user" ? "bg-sky-700 dark:bg-sky-950 text-white dark:text-accent-foreground": "bg-secondary dark:text-white" )}>
                      {message.content}
                    </div>

                    {/* Copy Button */}
                    <button  className={cn("text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 cursor-copy", message.role === "user" ? "ml-auto":"mr-auto")}  onClick={() => navigator.clipboard.writeText(message.content)} title="Copy message">
                      <ClipboardCopy className="w-4 h-4" />
                      Copy
                    </button>

                  </div>

                  <div ref={messagesEndRef} />
                  
                </div>})}

        </>)
  }

export default Conversation