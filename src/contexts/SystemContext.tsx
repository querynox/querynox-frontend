import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface SystemContextType {
    darkmode: boolean;

    setDarkmode: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultContext : SystemContextType = {
    darkmode:localStorage.getItem("darkmode") == "true" ? true : false,

    setDarkmode: () => { }
}


const SystemContext = createContext<SystemContextType>(defaultContext);

export const SystemProvider : React.FC<{ children: ReactNode }> = ({ children }) => {

    const [darkmode, setDarkmode] = useState<boolean>(defaultContext.darkmode);
    
    useEffect(()=>{
        localStorage.setItem("darkmode",darkmode ? "true": "false");
    },[darkmode])

    const value = {
        darkmode,

        setDarkmode 
    }

    return (
        <SystemContext.Provider value={value}> <div className={darkmode ? "dark": ""}> {children} </div></SystemContext.Provider> 
    )
}

export const useSystemContext = () : SystemContextType => {
    const context = useContext(SystemContext);
    if(!context){
        throw new Error("useSystemContext must be used within a SystemProvider")
    }

    return context;

}