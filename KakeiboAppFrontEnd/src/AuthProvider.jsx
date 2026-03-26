import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("jws");
        if (token) { setIsLoggedIn(true) };
    }, []);

    const login = (token) => {
        sessionStorage.setItem("jws", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem("jws");
        sessionStorage.clear();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);