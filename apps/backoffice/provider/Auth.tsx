"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readMe } from "@directus/sdk";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { Role } from "@/types";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  currentUser: UserData | null;
  members: any[] | null; // Store fetched API data here
}

interface Props {
  children: React.ReactNode;
}

export interface UserData {
  tags: string[];
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: {
    id: string;
    name: Role;
  } | null;
  token: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: (username: string, password: string) => {},
  logout: () => {},
  currentUser: null,
  members: null,
});

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [members, setMembers] = useState<any[] | null>(null); // State to store fetched API data
  const { client } = useDirectusContext();
  const router = useRouter();

  // Function to check the current user and their role
  const checkCurrentUser = async () => {
    try {
      const result = await client.request(
        readMe({
          fields: ["first_name", "last_name", "email", "role.name", "tags"], // Fetch role.name for role check
        }),
      );

      if (result) {
        let NIKs = [];
        const user = result as unknown as UserData;
        const nikTag = user?.tags?.find((tag: string) => tag.startsWith("NIK:"));

        if (user && nikTag) {
          NIKs = await fetchMembers(nikTag.split(":")[1]);
          NIKs = NIKs.data.map((item: { NO_INDUK: string }) => item.NO_INDUK);
        }

        setMembers(NIKs);
        setCurrentUser(user);
        setIsAuthenticated(true);

        return true;
      } else {
        setIsAuthenticated(false);
        router.replace("/login");
        return false;
      }
    } catch (error) {
      console.error("Error checking current user:", error);
      setIsAuthenticated(false);
      router.replace("/login");
    }
  };

  // Function to login the user
  const login = async (username: string, password: string) => {
    try {
      const result = await client.login(username, password);
      if (result) {
        await checkCurrentUser();
        setCookie(
          "auth",
          JSON.stringify({ accessToken: result.access_token }),
          {
            path: "/",
          },
        );
        router.replace('/');
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    await client.logout();
    deleteCookie("auth");
    setIsAuthenticated(false);
    setMembers(null); // Clear API data on logout
    router.replace("/login");
  };

  const fetchMembers = async (nik: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HL_URL}/api/tad/list-bawahan/${nik}?limit=1000`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  // Run check on component mount
  useEffect(() => {
    const cookie = getCookie("auth");
    if (!cookie) {
      router.replace("/login");
      return;
    }
    checkCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        currentUser,
        members,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
