import { useState } from 'react'; 
import { UserContext } from './UserContext';
export default function UserProvider({ children }) {
    const [loggingUsername, setLoggingUsername] = useState("");

    return (
        <UserContext.Provider value={{ loggingUsername, setLoggingUsername }}>
            {children}
        </UserContext.Provider>
    )
}