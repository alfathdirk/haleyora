import fs from 'fs-extra';
import path from 'node:path';

export async function writeOptions(baseDir: string, options: Record<string, unknown>) {
  await fs.ensureDir(baseDir);

  for (const key in options) {
    const value = options[key];
    const ext = detectExt(key, value);
    if (ext === '.json') {
      await fs.writeFile(path.join(baseDir, key + ext), JSON.stringify(value, null, 2));
    } else {
      await fs.writeFile(path.join(baseDir, key + ext), value as string);
    }
  }
}

function detectExt(key: string, value: unknown): string {
  if (isScript(key)) {
    return '.js';
  }

  if (isText(value)) {
    return '.txt';
  }

  return '.json';
}

function isScript(key: string) {
  return key === 'code';
}

function isText(value: unknown) {
  return typeof value === 'string' && value.split(/[\r\n]/g).length > 1;
}
