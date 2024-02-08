import { Client } from './Client.js';
import path from 'path';
import { authentication, createDirectus, rest } from '@directus/sdk';
import { Config } from './Config.js';

const DEFAULT_CONFIG_FILE = path.join(process.cwd(), 'devtool.config.js');

export class AppContext {
  constructor(private configFile: string = DEFAULT_CONFIG_FILE) {

  }

  private promisedConfig?: Promise<Config>;
  config(): Promise<Config> {
    if (this.promisedConfig) {
      return this.promisedConfig;
    }

    this.promisedConfig = (async(): Promise<Config> => {
      try {
        const mod = await import(this.configFile);
        const props = mod.default;
        if (!props.adminEmail) {
          throw new Error('admin email must be specified');
        }
        if (!props.adminPassword) {
          throw new Error('admin password must be specified');
        }

        return {
          adminEmail: props.adminEmail,
          adminPassword: props.adminPassword,
          baseUrl: props.baseUrl ?? 'http://localhost:8055',
          srcDir: props.srcDir ?? './src',
          dbDir: props.dbDir ?? './database',
          uploadDir: props.uploadDir ?? './uploads',
        };
      } catch (err) {
        console.warn('devtool: no configuration found, assuming default');

        return {
          adminEmail: 'admin@example.com',
          adminPassword: '1',
          baseUrl: 'http://localhost:8055',
          srcDir: './src',
          dbDir: './database',
          uploadDir: './uploads',
        };
      }
    })();

    return this.promisedConfig;
  }

  private promisedClient?: Promise<Client>;
  client(): Promise<Client> {
    if (this.promisedClient) {
      return this.promisedClient;
    }

    this.promisedClient = (async() => {
      const config = await this.config();
      const client = createDirectus(config.baseUrl)
        .with(rest())
        .with(authentication('json', { autoRefresh: false }));

      await client.login(config.adminEmail, config.adminPassword);

      return client;
    })();

    return this.promisedClient;
  }
}
