import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        try { 
            const token = sessionStorage.getItem("jws");
            if (token) { setIsLoggedIn(true) };
        }catch (err) {
            console.log("sessionStorage取得失敗:" + err);
        }
    }, []);

    const login = (token) => {
        try {
            sessionStorage.setItem("jws", token);
            setIsLoggedIn(true);
        } catch (err) {
            console.log("ログインのためのトークンの取得に失敗しました:" + err);
        }
    };

    const logout = () => {
        try {
            sessionStorage.removeItem("jws");
            sessionStorage.clear();
            setIsLoggedIn(false);
        } catch (err) {
            console.log("ログアウトのためのトークン制御に失敗しました:" + err);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);