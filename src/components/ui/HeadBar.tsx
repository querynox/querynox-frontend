import { models , type ModelEnum} from "@/data/models"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { useChatContext } from "@/contexts/ChatContext";
import { useEffect } from "react";

type HeadBarProps = {
  activeModel: ModelEnum;
  setActiveModel: React.Dispatch<React.SetStateAction<ModelEnum>>;
};

const HeadBar = ({ activeModel, setActiveModel }: HeadBarProps) => {
  
  const groupedModels = models.reduce((acc, model) => {
    const category = model.modelCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {} as Record<string, typeof models>);

  const {chats,activeChatIndex,setChats} = useChatContext();

  const selectedModel = () : ModelEnum => {
    if(activeChatIndex<0) return "gpt-3.5-turbo"
    const model = chats[activeChatIndex]?.model?.trim();
    if (!model) return "gpt-3.5-turbo";

    const allModels = Object.values(groupedModels).flat().map(m => m.modelName);
    return allModels.includes(model) ? model : "gpt-3.5-turbo";
  }

  const changeSelectedModel = (modelName:string) => {
    setActiveModel(modelName);
    const updatedChats = [...chats]; // clone
    if (updatedChats[activeChatIndex]) {
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
    <div className="flex flex-row items-center px-4 pb-3 border-b-[1px] ">
        <h1 className="text-4xl font-bold flex-1">
          QueryNOX
        </h1>

        <Select value={activeModel} onValueChange={changeSelectedModel}>
          <SelectTrigger>
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
    </div>
  )
}

export default HeadBar