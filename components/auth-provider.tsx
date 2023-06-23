"use client"

import { getCurrentUser } from "@/lib/session";
import { User } from "next-auth";
import React, { createContext, useContext, useEffect, useState } from "react";


interface AuthContextType {
  user: User | null
  authenticated: boolean
}

const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<AuthContextType['user']>(null)
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(function () {
    getCurrentUser().then((user) => {
      if (user) {
        setUser(user)
        setAuthenticated(true)
      }
      else {
        setUser(null)
        setAuthenticated(false)
      }
    }).catch((e) => {
      setUser(null)
      setAuthenticated(false)
    });
  }, []);

  const value = {
    user: user,
    authenticated: authenticated,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)