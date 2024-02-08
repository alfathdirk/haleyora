import { createDirectus, authentication, rest, login, RestClient, DirectusClient, AuthenticationClient } from '@directus/sdk';
import { createContext, useEffect } from 'react';

const DIRECTUS_HOSTS = 'http://localhost:8055';

interface DirectusContextProps {
  client: DirectusClient<object> & RestClient<object> & AuthenticationClient<object>;
}

interface Props {
  children: React.ReactNode;
}

export const DirectusContext = createContext<DirectusContextProps>({
  client: {} as DirectusClient<object> & RestClient<object> & AuthenticationClient<object>,
});

export const DirectusProvider = ({ children }: Props) => {
  const client = createDirectus(DIRECTUS_HOSTS).with(authentication('cookie', { credentials: 'include' })).with(rest());

  // TODO: delete soon
  window.client = client;

  return (
    <DirectusContext.Provider value={{ client }}>{children}</DirectusContext.Provider>
  );
};
