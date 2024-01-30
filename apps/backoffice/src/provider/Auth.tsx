'use client'
import { deleteCookie, setCookie } from 'cookies-next';
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

interface Props {
  children: React.ReactNode;
}

export interface UserData {
  username: string;
  email: string;
  token: string;
  role: string;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: (username: string, password: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const login = (username: string, password: string) => {
    const sampleUser: UserData = {
      username: username,
      email: `${username}@gmail.com`,
      token: 'token',
      role: 'admin',
    };
    setCookie('auth', JSON.stringify(sampleUser))
    setIsAuthenticated(true);
    return router.push('/');
  };

  const logout = () => {
    deleteCookie('auth');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};
