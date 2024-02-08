import { Client } from '../Client.js';
import { Config } from '../Config.js';
import { pullAc } from './pullAc.js';
import { pullFlow } from './pullFlow.js';
import { pullSchema } from './pullSchema.js';

export async function pull(client: Client, config: Config) {
  await pullSchema(client, config);
  await pullFlow(client, config);
  await pullAc(client, config);
}
