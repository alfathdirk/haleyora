import { schemaSnapshot } from '@directus/sdk';
import { Client } from '../Client.js';
import { Config } from '../Config.js';
import path from 'path';
import fs from 'fs-extra';
import { writeOptions } from '../utils/writeOptions.js';

export async function pullSchema(client: Client, config: Config) {
  const snapshot = await client.request(schemaSnapshot());

  const baseDir = path.join(config.srcDir, 'schema');
  await fs.remove(baseDir);
  await fs.ensureDir(baseDir);

  await fs.writeFile(path.join(baseDir, 'schema.json'), JSON.stringify(snapshot, null, 2));

  for (const field of snapshot.fields) {
    const options = field.meta.options;
    if (!options) {
      continue;
    }
    await writeOptions(path.join(baseDir, field.collection, field.field), options);
  }
}
