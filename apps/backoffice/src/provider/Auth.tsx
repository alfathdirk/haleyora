'use client'
import { deleteCookie, setCookie } from 'cookies-next';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { DirectusContext } from './Directus';

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
  const { client }= useContext(DirectusContext);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    let result = await client.login(username, password);
    if (result) {
      setCookie('auth', JSON.stringify(result), { path: '/' });
      setIsAuthenticated(true);
      router.push('/');
    }
  };

  const logout = () => {
    deleteCookie('auth');
    client.logout();
    setIsAuthenticated(false);
    router.push('/login');
  };

  useEffect(() => {
    (async () => {
      try {
        let response = await client.refresh();
        if (response) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.warn('belum login gais > ', error)
        setIsAuthenticated(false);
        return router.push('/login');
      }
    })();
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};
