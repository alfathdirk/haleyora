import fs from 'fs-extra';
import path from 'node:path';

export async function readOptions(baseDir: string): Promise<Record<string, unknown> | null> {
  if (await fs.exists(baseDir) === false) {
    return null;
  }

  const options: Record<string, unknown> = {};
  const files = await fs.readdir(baseDir);
  for (const file of files) {
    const ext = path.extname(file);
    const key = path.basename(file, ext);
    const content = await fs.readFile(path.join(baseDir, file), 'utf8');
    if (ext === '.json') {
      options[key] = JSON.parse(content);
    } else {
      options[key] = content;
    }
  }
  return Object.keys(options).length === 0 ? null : options;
}
