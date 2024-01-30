import fs from 'fs-extra';
import path from 'path';

export class ExtractedField {
  readonly options: string[];
  readonly fileMap = new Map<string, string>();

  constructor(private baseDir: string) {
    const fileNames = fs.readdirSync(baseDir);
    this.options = fileNames.map((fileName) => {
      const name = fileName.split('.')[0];
      this.fileMap.set(name, fileName);
      return name;
    });
  }

  getFilePath(option: string) {
    const fileName = this.fileMap.get(option);
    if (!fileName) {
      throw new Error('extracted option not found');
    }
    return path.join(this.baseDir, fileName);
  }

  writeOption(option: string, content: string) {
    fs.writeFileSync(this.getFilePath(option), content);
  }

  readOption(option: string): string {
    return fs.readFileSync(this.getFilePath(option), 'utf-8');
  }
}
