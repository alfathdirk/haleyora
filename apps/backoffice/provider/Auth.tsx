"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DirectusUser, readMe } from "@directus/sdk";
import { useDirectusContext } from "@/hooks/useDirectusContext";

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
  avatar: string | null;
  language: string | null;
  theme: string | null;
  tfa_secret: string | null;
  status: string;
  role: {
    id: string;
    name: string;
  } | null;
  token: string | null;
  last_access: "datetime" | null;
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
  currentUser: null,
});

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const { client } = useDirectusContext();
  const router = useRouter();

  const checkCurrentUser = async () => {
    try {
      const result = await client.request(readMe({ fields: ["*.*"] }));
      if (result) {
        setCurrentUser(result as unknown as UserData);
        setIsAuthenticated(true);
        return true;
      }
      setIsAuthenticated(false);
      router.replace("/login");
      return false;
    } catch (error) {
      router.replace("/login");
      setIsAuthenticated(false);
    }
  };

  const login = async (username: string, password: string) => {
    let result = await client.login(username, password);
    if (result) {
      setCookie("auth", JSON.stringify({ accessToken: result.access_token }), {
        path: "/",
      });
      checkCurrentUser();
      router.replace("/");
    }
  };

  const logout = () => {
    deleteCookie("auth");
    client.logout();
    setIsAuthenticated(false);
    router.replace("/login");
  };

  useEffect(() => {
    let cookie = getCookie("auth");
    if (!cookie) {
      router.replace("/login");
      return;
    }
    checkCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
