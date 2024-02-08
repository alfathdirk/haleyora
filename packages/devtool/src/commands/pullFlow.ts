import { readFlows, readOperations } from '@directus/sdk';
import { Client } from '../Client.js';
import { Config } from '../Config.js';
import fs from 'fs-extra';
import path from 'node:path';
import { writeOptions } from '../utils/writeOptions.js';

export async function pullFlow(client: Client, config: Config) {
  const flows = await client.request(readFlows());
  const operations = await client.request(readOperations());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flows.forEach((flow: any) => {
    delete flow.date_created;
    delete flow.user_created;
    delete flow.operations;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  operations.forEach((operation: any) => {
    delete operation.date_created;
    delete operation.user_created;
  });

  const baseDir = path.join(config.srcDir, 'flow');
  await fs.remove(baseDir);
  await fs.ensureDir(baseDir);
  await fs.writeFile(path.join(baseDir, 'flows.json'), JSON.stringify(flows, null, 2));
  await fs.writeFile(path.join(baseDir, 'operations.json'), JSON.stringify(operations, null, 2));

  for (const operation of operations) {
    const flow = flows.find((flow) => flow.id === operation.flow);
    if (!flow) {
      throw new Error('flow not found');
    }

    if (!operation.options) {
      return;
    }
    await writeOptions(path.join(baseDir, flow.name, operation.key), operation.options);
  }
}
