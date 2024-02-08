import { authentication, createDirectus, rest } from '@directus/sdk';
import { Client } from '../Client.js';

export const DIRECTUS_URL = 'http://localhost:8055';
export const DIRECTUS_EMAIL = 'admin@example.com';
export const DIRECTUS_PASSWORD = '1';

export async function useClient(): Promise<Client> {
  const client = createDirectus(DIRECTUS_URL)
    .with(rest())
    .with(authentication('json', { autoRefresh: false }));

  await client.login(DIRECTUS_EMAIL, DIRECTUS_PASSWORD);

  return client;
}
