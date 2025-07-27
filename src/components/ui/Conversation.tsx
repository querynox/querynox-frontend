import type { Message } from '@/data/types'
import { cn } from '@/lib/utils'
import { ClipboardCopy } from 'lucide-react'
import { useEffect, useRef } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';

type ConversationPropType = {
  activeMessages:Message[];
  isThinking:boolean;
}

const Conversation = ({activeMessages, isThinking}:ConversationPropType) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages,isThinking]);

  return (<>
      {activeMessages.map((message, index)=>{
        return <div key={index + message._id} className={cn("flex",message.role === "user" ? "justify-end" : "justify-start")}>

                  {/* Bubble Container */}
                  <div className="relative group max-w-[85%] px-4 py-2 mb-2">
     
                    <MarkdownPreview
                      source={message.content}
                      className="rounded-lg px-4 py-2 mb-2 whitespace-pre-wrap"
                      style={{
                        backgroundColor: message.role === "user" ? "var(--markdown-user-background)" : "var(--markdown-assistant-background)",
                        color: message.role === "user" ? "var(--markdown-user-text)" : "var(--markdown-assistant-text)",
                      }}
                    />       

                    {/* Czpy Button */}
                    <button  className={cn("text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 cursor-copy", message.role === "user" ? "ml-auto":"mr-auto")}  onClick={() => navigator.clipboard.writeText(message.content)} title="Copy message">
                      <ClipboardCopy className="w-4 h-4" />
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