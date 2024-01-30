#!/usr/bin/env node
import { Command } from 'commander';
import promptly from 'promptly';
import path from 'path';
import { Devtool } from './dist/index.js';

const DEFAULT_CONFIG_FILE = path.join(process.cwd(), 'devtool.config.js');

(async () => {
  const config = await readConfig();
  const devtool = new Devtool(config);

  const program = new Command();

  program.name('devtool')
    .description('Directus devtool')
    .version('1.0.0');

  program.command('pull')
    .description('Pull from directus instance to local')
    .action(async () => {
      devtool.pull();
    });

  program.command('push')
    .description('Push from local to directus instance')
    .option('--yes', 'yes confirmation')
    .action(async (opts) => {
      function validator(value) {
        if (value === 'yes') {
          return true;
        }

        if (value === 'no') {
          return false;
        }

        throw new Error('please input yes or no');
      }

      if (!opts.yes) {
        const ok = await promptly.prompt('Are you sure want to push? (yes or no) ', { validator });
        if (!ok) {
          return;
        }
      }

      devtool.push();
    });

  program.command('config')
    .action(async () => {
      const config = devtool.config();
      console.info(config);
    });

  program.parse();
})();


async function readConfig(configFile = DEFAULT_CONFIG_FILE) {
  const mod = await import(configFile);
  return mod.default;
}
