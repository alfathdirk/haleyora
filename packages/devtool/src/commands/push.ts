import { Client } from '../Client.js';
import { Config } from '../Config.js';
import { pushAc } from './pushAc.js';
import { pushFlow } from './pushFlow.js';
import { pushSchema } from './pushSchema.js';

export async function push(client: Client, config: Config) {
  await pushSchema(client, config);
  await pushFlow(client, config);
  await pushAc(client, config);
}
