import { useState } from 'react'; 
import { UserContext } from './UserContext';
export default function UserProvider({ children }) {
    const [userName, setUserName] = useState("");

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    )
}