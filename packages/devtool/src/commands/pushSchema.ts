import { schemaApply, schemaDiff } from '@directus/sdk';
import { Client } from '../Client.js';
import { Config } from '../Config.js';
import path from 'path';
import fs from 'fs-extra';
import { readOptions } from '../utils/readOptions.js';

export async function pushSchema(client: Client, config: Config) {
  const baseDir = path.join(config.srcDir, 'schema');
  const snapshot = JSON.parse(await fs.readFile(path.join(baseDir, 'schema.json'), 'utf8'));

  for (const field of snapshot.fields) {
    const options = await readOptions(path.join(baseDir, field.collection, field.field));
    if (!options) {
      continue;
    }
    field.meta.options = {
      ...field.meta.options,
      ...options,
    };
  }

  const diff = await client.request(schemaDiff(snapshot));
  if (!diff?.hash) {
    console.info('schema: skip apply, no diff');
    return;
  }

  console.info('schema: apply diff');
  await client.request(schemaApply(diff));
}
