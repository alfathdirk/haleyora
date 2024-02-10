import {
  AuthenticationClient,
  RestClient,
  authentication,
  createDirectus,
  createItem,
  deleteItem,
  rest,
} from '@directus/sdk';

export const DIRECTUS_URL = 'http://localhost:8055';
export const DIRECTUS_EMAIL = 'admin@example.com';
export const DIRECTUS_PASSWORD = '1';

export class Directus {
  static async login() {
    const directus = new Directus();
    await directus.login();
    return directus;
  }

  readonly client: RestClient<object> & AuthenticationClient<object>;

  constructor() {
    this.client = createDirectus(DIRECTUS_URL)
      .with(rest())
      .with(authentication('json', { autoRefresh: false }));
  }

  async login() {
    await this.client.login(DIRECTUS_EMAIL, DIRECTUS_PASSWORD);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createItem(collection: string, item: any): Promise<any> {
    const result = await this.client.request(createItem(collection as never, item as never));
    return result;
  }

  async deleteItem(collection: string, id: string | number): Promise<void> {
    try {
      await this.client.request(deleteItem(collection as never, id));
    } catch (err) {
      // noop
    }
  }
}
