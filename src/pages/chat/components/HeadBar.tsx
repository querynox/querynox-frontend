
import { useChatContext } from "@/contexts/ChatContext";
import { useSystemContext } from "@/contexts/SystemContext";
import { Moon, Sun } from "lucide-react";

const HeadBar = () => {
  const { darkmode, setDarkmode } = useSystemContext();

  return (
    <div className="flex flex-row items-center justify-between p-3 border-b-[1px] text-accent-foreground bg-secondary">

        <div className="flex items-center space-x-3">
            <img 
              src="/querynox.jpeg" 
              alt="QueryNox" 
              className="h-10 w-10 rounded-lg"
            />
          <div className="flex items-center space-x-2">
            <span className="font-semibold">
              <span className="text-foreground">Query</span>
              <span className="text-muted-foreground">Nox</span>
            </span>
          </div>
        </div>

        <div className="cursor-pointer transition-all px-2" onClick={()=>{setDarkmode(prev=>!prev)}}>
          {darkmode? <Sun /> : <Moon/>}
        </div>

    </div>
  )
}

export default HeadBar