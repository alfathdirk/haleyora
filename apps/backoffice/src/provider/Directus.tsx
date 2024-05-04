import {
  createDirectus,
  authentication,
  rest,
  login,
  RestClient,
  DirectusClient,
  AuthenticationClient,
  staticToken,
} from "@directus/sdk";
import { getCookie, getCookies } from "cookies-next";
import { createContext, useEffect } from "react";

interface DirectusContextProps {
  client: DirectusClient<object> &
    RestClient<object> &
    AuthenticationClient<object>;
}

interface Props {
  children: React.ReactNode;
}

export const DirectusContext = createContext<DirectusContextProps>({
  client: {} as DirectusClient<object> &
    RestClient<object> &
    AuthenticationClient<object>,
});

export const DirectusProvider = ({ children }: Props) => {
  let { accessToken } = JSON.parse(getCookie("auth") ?? "{}");
  const client = createDirectus(process.env.NEXT_PUBLIC_BACKEND_URL)
    // .with(authentication())
    .with(authentication("cookie", { credentials: "include", autoRefresh: true }))
    .with(rest());

  if (accessToken) {
    client.setToken(accessToken);
  }

  // TODO: delete soon
  // window.client = client;

  return (
    <DirectusContext.Provider value={{ client }}>
      {children}
    </DirectusContext.Provider>
  );
};
