'use client'
import { deleteCookie, setCookie } from 'cookies-next';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { DirectusContext } from './Directus';
import { DirectusUser, readMe } from '@directus/sdk';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  currentUser: UserData | null;
}

interface Props {
  children: React.ReactNode;
}

export interface UserData {
  id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    password: string | null;
    location: string | null;
    title: string | null;
    description: string | null;
    tags: string[] | null;
    avatar:  string | null;
    language: string | null;
    theme: string | null;
    tfa_secret: string | null;
    status: string;
    role: string;
    token: string | null;
    last_access: 'datetime' | null;
    last_page: string | null;
    provider: string;
    external_identifier: string | null;
    auth_data: Record<string, any> | null;
    email_notifications: boolean | null;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: (username: string, password: string) => {},
  logout: () => {},
  currentUser: null
});

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const { client }= useContext(DirectusContext);
  const router = useRouter();

  const checkCurrentUser = async () => {
    try {
      const result = await client.request(readMe());
      console.log(result)
      if (result) {
        setCurrentUser(result as UserData)
        setCookie('auth', JSON.stringify(result), { path: '/' });
      }
    } catch (error) {

    }
  }

  const login = async (username: string, password: string) => {
    let result = await client.login(username, password);
    if (result) {
      await checkCurrentUser()
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
          await checkCurrentUser()
        }
      } catch (error) {
        console.warn('belum login gais > ', error)
        setIsAuthenticated(false);
        return router.push('/login');
      }
    })();
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );

};
