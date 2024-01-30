import { Schema } from './Schema.js';
import { authentication, createDirectus, rest } from '@directus/sdk';

interface DevtoolConfig {
  adminEmail?: string;
  adminPassword?: string;
  baseUrl?: string;
  srcDir?: string;
  dbDir?: string;
  uploadDir?: string;
}

export class Devtool {
  readonly adminEmail: string;
  readonly adminPassword: string;
  readonly baseUrl: string;
  readonly srcDir: string;
  readonly dbDir: string;
  readonly uploadDir: string;

  constructor(config: DevtoolConfig) {
    if (!config.adminEmail) {
      throw new Error('admin email must be specified');
    }
    this.adminEmail = config.adminEmail;

    if (!config.adminPassword) {
      throw new Error('admin password must be specified');
    }
    this.adminPassword = config.adminPassword;

    this.baseUrl = config.baseUrl ?? 'http://localhost:8055';
    this.srcDir = config.srcDir ?? 'directus/src';
    this.dbDir = config.dbDir ?? 'directus/database';
    this.uploadDir = config.uploadDir ?? 'directus/uploads';
  }

  private async client() {
    const client = createDirectus(this.baseUrl)
      .with(rest())
      .with(authentication('json', { autoRefresh: false }));

    await client.login(this.adminEmail, this.adminPassword);

    return client;
  }

  async pull() {
    const client = await this.client();
    const schema = new Schema({
      client,
      srcDir: this.srcDir,
    });

    await schema.pull();
  }

  async push() {
    const client = await this.client();
    const schema = new Schema({
      client,
      srcDir: this.srcDir,
    });

    await schema.push();
  }

  config() {
    return {
      adminEmail: this.adminEmail,
      adminPassword: this.adminPassword,
      baseUrl: this.baseUrl,
      srcDir: this.srcDir,
      dbDir: this.dbDir,
      uploadDir: this.uploadDir,
    };
  }
}
