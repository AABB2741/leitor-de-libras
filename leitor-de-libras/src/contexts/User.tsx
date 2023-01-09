import { useState, createContext, useContext } from "react";
import User from "../@types/User";
import USER from "../constants/user";

interface UserProviderProps {
    children: JSX.Element;
}

const UserContext = createContext<User>(USER);

export default function UserProvider({ children }: UserProviderProps) {
    return (
        <UserContext.Provider value={USER}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
