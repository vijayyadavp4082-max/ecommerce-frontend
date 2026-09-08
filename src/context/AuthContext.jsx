import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../service/authService";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);


    useEffect(() => {
        const loadCurrentUser = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const responce = await getCurrentUser(token);
                setUser(responce.data);
            } catch (error) {
                console.log(error);
                localStorage.removeItem("authToken");
                setUser(null)

            }
            finally {
                setLoading(false);
            }

        }
        loadCurrentUser();

    }, []);

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    }
    const isAuthenticated = user != null;

    return (
        <AuthContext.Provider value={{ user,setUser, isAuthenticated, loading, logout }}>{children}</AuthContext.Provider>
    )
}
export default AuthProvider