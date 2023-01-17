import { useState, useEffect, createContext, useContext } from "react";
import User from "../@types/User";
import USER from "../constants/user";

type UserValue = {
    user?: User;
    signed: boolean;
    logOut: () => void;
}

interface UserProviderProps {
    children: JSX.Element;
}

const UserContext = createContext<UserValue>({} as UserValue);

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | undefined>(undefined);

    async function logOut() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, 1000);
        });
    }

    useEffect(() => {
        setTimeout(() => {
            setUser(USER);
        }, 1000);
    }, []);

    if (user === undefined)
        return null;
    
    return (
        <UserContext.Provider value={{ user, signed: !!user, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
