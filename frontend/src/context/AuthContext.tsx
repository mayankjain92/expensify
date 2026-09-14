"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data.success) {
      setUser(res.data.user);
      router.push("/dashboard");
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const res = await api.post("/auth/register", { username, email, password });
    if (res.data.success) {
      setUser(res.data.user);
      router.push("/dashboard");
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
