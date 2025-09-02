import { useSystemContext } from "@/contexts/SystemContext";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUserContext } from "@/contexts/UserContext";
import { Moon, Sun } from "lucide-react";

const HeadBar = () => {
  const { darkmode, setDarkmode } = useSystemContext();
  const { user } = useUserContext()

  return (
    <div className="flex flex-row items-center justify-between p-3 border-b-[1px] text-accent-foreground bg-secondary">

        <div className="flex items-center space-x-3">
            <div className="md:hidden mr-1">
              <SidebarTrigger />
            </div>
            <img 
              src="/querynox.jpeg" 
              alt="QueryNox" 
              className="h-10 w-10 rounded-lg"
            />
          <div className="flex items-center space-x-1">
            <span className="font-semibold z-20">
              <span className="text-foreground">Query</span>
              <span className="text-muted-foreground">Nox</span>
            </span>
            
            {/* Pro Label */}
            {user?.isPro && <span className="relative bottom-2 right-1 z-10  px-[3px] py-[1px] text-[12px] rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-sm">
              Pro
            </span>}
          </div>
        </div>

        <div className="cursor-pointer transition-all px-2" onClick={()=>{setDarkmode(prev=>!prev)}}>
          {darkmode? <Sun /> : <Moon/>}
        </div>

    </div>
  )
}

export default HeadBar