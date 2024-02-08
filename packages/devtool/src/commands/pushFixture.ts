import { AllCollections, aggregate, createItem, readCollection, updateSingleton } from '@directus/sdk';
import { Client } from '../Client.js';
import { Config } from '../Config.js';
import fs from 'fs-extra';
import path from 'path';

interface Meta {
  singleton: boolean;
}

interface Collection {
  collection: string;
  meta: Meta;
}

export async function pushFixture(client: Client, config: Config) {
  const files = await fs.readdir(path.join(config.srcDir, 'fixture'));
  for (const file of files) {
    const ext = path.extname(file);
    const key = path.basename(file, ext);
    const collection = await getCollection(client, key);
    if (!collection) {
      console.error('fixture: collection not exists');
      continue;
    }

    if (collection.meta.singleton) {
      const item = await readJson(path.join(config.srcDir, 'fixture', key + '.json'));
      await client.request(updateSingleton(key as never, item as never));
      console.info('fixture:', key, 'singleton pushed');
      continue;
    }

    const [{ count }] = await client.request(aggregate(key as AllCollections<object>, {
      aggregate: { count: '*' },
    }));

    if (count) {
      console.error('fixture:', key, 'items already exists');
      continue;
    }

    const items: unknown[] = await readJson(path.join(config.srcDir, 'fixture', key + '.json'));
    for (const item of items) {
      await client.request(createItem(key as never, item as never));
    }
    console.info('fixture:', items.length, key, 'items pushed');
  }
}

async function readJson<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

async function getCollection(client: Client, name: string): Promise<Collection | null> {
  try {
    const collection = await client.request(readCollection(name));
    return collection;
  } catch (err) {
    return null;
  }
}
