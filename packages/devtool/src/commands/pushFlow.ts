import { createFlows, createOperations, deleteFlows, readFlows } from '@directus/sdk';
import { Client } from '../Client.js';
import { Config } from '../Config.js';
import fs from 'fs-extra';
import path from 'node:path';
import { readOptions } from '../utils/readOptions.js';

export async function pushFlow(client: Client, config: Config) {
  const { flows, operations } = await readLocal(path.join(config.srcDir, 'flow'));
  await writeRemote(client, flows, operations);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function writeRemote(client: Client, flows: any, operations: any) {
  const existingFlows = await client.request(readFlows());
  const existingFlowIds = existingFlows.map((flow) => flow.id);
  if (existingFlowIds.length > 0) {
    await client.request(deleteFlows(existingFlowIds));
  }

  await client.request(createFlows(flows));
  await client.request(createOperations(operations.reverse()));
}

async function readLocal(baseDir: string) {
  const flows = JSON.parse(await fs.readFile(path.join(baseDir, 'flows.json'), 'utf8'));
  const operations = JSON.parse(await fs.readFile(path.join(baseDir, 'operations.json'), 'utf8'));

  for (const operation of operations) {
    const flow = flows.find((flow: { id: string }) => flow.id === operation.flow);

    const options = await readOptions(path.join(baseDir, flow.name, operation.key));
    if (!options) {
      continue;
    }
    operation.options = {
      ...operations.options,
      ...options,
    };
  }
  return { flows, operations };
}
