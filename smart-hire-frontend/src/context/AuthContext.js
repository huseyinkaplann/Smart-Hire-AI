import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        if (token) return jwtDecode(token);
        return null;
    });

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
        setUser(jwtDecode(newToken));
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);