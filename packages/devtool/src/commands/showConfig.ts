import { Config } from '../Config.js';

export async function showConfig(config: Config) {
  await Promise.resolve();
  const keys = Object.keys(config) as (keyof Config)[];
  keys.forEach((key) => {
    const value = config[key];
    console.info(key + '=' + value);
  });
}
