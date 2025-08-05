import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface SystemContextType {
    darkmode: boolean;
    isSidebarOpen:boolean;

    setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext : SystemContextType = {
    darkmode:localStorage.getItem("darkmode") == "true" ? true : false,
    isSidebarOpen:localStorage.getItem("sidebarOpen") == "true" ? true : false,

    setDarkmode: () => { },
    setIsSidebarOpen: () => { }
}


const SystemContext = createContext<SystemContextType>(defaultContext);

export const SystemProvider : React.FC<{ children: ReactNode }> = ({ children }) => {

    const [darkmode, setDarkmode] = useState<boolean>(defaultContext.darkmode);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(defaultContext.isSidebarOpen);
    
    useEffect(()=>{
        localStorage.setItem("darkmode",darkmode ? "true": "false");
        if(darkmode) {
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
    },[darkmode])

    useEffect(()=>{
        localStorage.setItem("sidebarOpen",isSidebarOpen ? "true": "false");
    },[isSidebarOpen])


    const value = {
        darkmode,
        isSidebarOpen,

        setDarkmode,
        setIsSidebarOpen
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