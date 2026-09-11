"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get('/auth/me');
                if(res.data.success){
                    setUser(res.data.user)
                }
            } catch (error) {
                setUser(null);
            }finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [])

    const login = async (email, password) => {
           const res = await api.post('/auth/login', {email, password})
           if(res.data.success){
            setUser(res.data.user);
            router.push('/dashboard');
           }
    };

    const register = async (username, email, password) => {
        const res = await api.post('/auth/register', {username, email, password})
        if(res.data.success){
            setUser(res.data.user);
            router.push('/dashboard');
        }
    }

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}