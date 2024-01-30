import { schemaSnapshot, RestClient, schemaDiff, schemaApply } from '@directus/sdk';
import fs from 'fs-extra';
import path from 'path';
import { ExtractedField } from './ExtractedField.js';

interface SchemaOpts {
  client: RestClient<any>;
  srcDir: string;
}

export class Schema {
  private client: RestClient<any>;
  private srcDir: string;

  constructor(opts: SchemaOpts) {
    this.client = opts.client;
    this.srcDir = opts.srcDir;
  }

  async pull() {
    console.info('pull schema: directus ==> local');

    const schema = await this.client.request(schemaSnapshot());
    this.writeJSON('schema.json', schema);

    schema.fields.forEach((row: any) => {
      const extractedField = this.readExtractedField(row.collection, row.field);
      if (!extractedField) {
        return;
      }

      extractedField.options.forEach((option) => {
        const content = row.meta?.options[option];
        extractedField.writeOption(option, content);
      });
    });
  }

  async push() {
    console.info('push schema: directus <== local');

    const schema = this.readJSON('schema.json');
    schema.fields.forEach((row: any) => {
      const extractedField = this.readExtractedField(row.collection, row.field);
      if (!extractedField) {
        return;
      }

      extractedField.options.forEach((option) => {
        const content = extractedField.readOption(option);
        row.meta.options[option] = content;
      });
    });

    const diff = await this.client.request(schemaDiff(schema));
    if (!diff?.hash) {
      console.info('push schema: no diff');
      return;
    }

    console.info('push schema: apply diff');
    await this.client.request(schemaApply(diff));
  }

  private readExtractedField(collection: string, field: string): ExtractedField | null {
    const fieldDirPath = path.join(this.srcDir, `fields/${collection}/${field}`)
    if (!fs.existsSync(fieldDirPath)) {
      return null;
    }

    return new ExtractedField(fieldDirPath);
  }

  private writeJSON(filePath: string, obj: unknown) {
    const p = path.join(this.srcDir, filePath);
    fs.mkdirpSync(path.dirname(p));
    fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
  }

  private readJSON(filePath: string) {
    const p = path.join(this.srcDir, filePath);
    const content = fs.readFileSync(p, 'utf-8');
    return JSON.parse(content);
  }
}
