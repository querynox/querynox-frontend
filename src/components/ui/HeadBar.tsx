import { models , type ModelEnum} from "@/data/models"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

import { useChatContext } from "@/contexts/ChatContext";
import { useSystemContext } from "@/contexts/SystemContext";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

type HeadBarProps = {
  activeModel: ModelEnum;
  setActiveModel: React.Dispatch<React.SetStateAction<ModelEnum>>;
};

const HeadBar = ({ activeModel, setActiveModel }: HeadBarProps) => {

  const { chats, activeChatIndex, setChats, newChat, setNewChat } = useChatContext();
  const { darkmode, setDarkmode } = useSystemContext();
  
  const groupedModels = models.reduce((acc, model) => {
    const category = model.modelCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {} as Record<string, typeof models>);


  const selectedModel = () : ModelEnum => {
    if(activeChatIndex<0) return newChat.model
    const model = chats[activeChatIndex]?.model?.trim();
    if (!model) return "gpt-3.5-turbo";

    const allModels = Object.values(groupedModels).flat().map(m => m.modelName);
    return allModels.includes(model) ? model : "gpt-3.5-turbo";
  }

  const changeSelectedModel = (modelName:string) => {
    setActiveModel(modelName);

    if(activeChatIndex<0){
      setNewChat((chat) => {
        const uChat = {...chat,model:modelName};
        return uChat;
      })
    }
    else if(chats[activeChatIndex]) {

      const updatedChats = [...chats]; // clone
      updatedChats[activeChatIndex] = {
        ...updatedChats[activeChatIndex],
        model: modelName,
      };
      setChats(updatedChats);
    }
  }

  useEffect(()=>{
    setActiveModel(selectedModel())
  },[activeChatIndex])

  return (
    <div className="flex flex-row items-center justify-between p-3 border-b-[1px] text-accent-foreground bg-secondary">

        <Select value={activeModel} onValueChange={changeSelectedModel} >
          <SelectTrigger className="w-48 bg-muted dark:bg-[#2e2e30]">
            <SelectValue placeholder="Models" />
          </SelectTrigger>
          <SelectContent>

            {Object.keys(groupedModels).map((key) => {
              return (
              <SelectGroup key={key}>
                <SelectLabel>{key}</SelectLabel>
                {groupedModels[key].map((model)=> <SelectItem value={model.modelName} key={model.modelName}>{model.modelName}</SelectItem> )}
              </SelectGroup>
              )
            }) }
          </SelectContent>
        </Select>

        <h1 className="text-[28px] font-semibold relative right-24">
          QueryNOX
        </h1>

        <div className="cursor-pointer transition-all px-2" onClick={()=>{setDarkmode(prev=>!prev)}}>
          {darkmode? <Sun /> : <Moon/>}
        </div>

    </div>
  )
}

export default HeadBar