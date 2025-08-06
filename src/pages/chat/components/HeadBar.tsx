
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

import { useChatContext } from "@/contexts/ChatContext";
import { useSystemContext } from "@/contexts/SystemContext";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import useQueryModels from "@/pages/chat/apis/queries/useQueryModels";
import type { Model } from "@/data/types";


const HeadBar = () => {
  const { data: models  } = useQueryModels();
  const { chats, activeChatIndex, setChats, setNewChat, activeChat } = useChatContext();
  const { darkmode, setDarkmode } = useSystemContext();
  
  const [groupedModels, setGroupedModels] = useState<Record<string, Model[]>>();
  
  useEffect(()=>{
    if(models)
    setGroupedModels(generateGroupedModels(models));
  },[models])
  
  const generateGroupedModels = (models:Model[]) :  Record<string, Model[]> => { return models.reduce((acc, model) => {
    const category = model.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {} as Record<string, typeof models>)}


  const changeSelectedModel = (modelName:string) => {
    if(activeChatIndex<0){
      setNewChat((chat) => {
        const uChat = {...chat,model:modelName};
        return uChat;
      })
    }else if(chats[activeChatIndex]){
      setChats(prev => {
        const chats = [...prev];
        const uChat = {...prev[activeChatIndex],model:modelName};
        chats[activeChatIndex] = uChat;
        return chats;
      })
    }
  }

  return (
    <div className="flex flex-row items-center justify-between p-3 border-b-[1px] text-accent-foreground bg-secondary">

        <Select value={activeChat.model} onValueChange={changeSelectedModel} >
          <SelectTrigger className="min-[762px]:w-36 min-[651px]:w-24 min-[451px]:w-18 w-12 bg-muted dark:bg-[#2e2e30] border-2 border-gray-400 dark:border-gray-500">
            <SelectValue placeholder="Models" />
          </SelectTrigger>
          <SelectContent >
              {groupedModels &&
              Object.keys(groupedModels).map((key) => {
                const _models = groupedModels;
                return (
                <SelectGroup key={key}>
                  <SelectLabel>{key}</SelectLabel>
                  {_models[key].map((model)=> <SelectItem value={model.name} key={model.name} title={model.description}><span  className="">{model.name}</span></SelectItem> )}
                </SelectGroup>
                )
              }) }
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-3 relative min-[762px]:right-10 min-[651px]:right-4 right-3">
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