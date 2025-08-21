import type { UserType } from "@/data/types";
import React, { type ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export interface UserContextType {
    user: UserType | null;

    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const defaultContext: UserContextType = {
    user: null,

    setUser: () => { }
}

const UserContext = createContext<UserContextType>(defaultContext);

export const useUserContext = () : UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}

export const UserProvider : React.FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<UserType | null>(defaultContext.user);

    const value = useMemo(() => ({
        user,

        setUser,
    }), [user]);

    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    );
}