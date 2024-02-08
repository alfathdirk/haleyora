import { Command } from 'commander';
import inquirer from 'inquirer';
import { AppContext } from './AppContext.js';
import { showConfig } from './commands/showConfig.js';
import { pullSchema } from './commands/pullSchema.js';
import { pushSchema } from './commands/pushSchema.js';
import { pullFlow } from './commands/pullFlow.js';
import { pushFlow } from './commands/pushFlow.js';
import { push } from './commands/push.js';
import { pull } from './commands/pull.js';
import { pushFixture } from './commands/pushFixture.js';
import { pullAc } from './commands/pullAc.js';
import { pushAc } from './commands/pushAc.js';

export function run() {
  const ctx = new AppContext();

  const program = new Command();

  program.name('devtool')
    .description('Directus devtool')
    .version('1.0.0');

  const fixtureCommand = new Command('fixture');

  fixtureCommand.command('push')
    .description('Push fixture data')
    .option('-y, --yes', 'Say yes to confirm')
    .action(async(cmdOpts) => {
      const opts = await inquirer.prompt([
        {
          name: 'yes',
          message: 'Are you sure want to push to directus instance?',
          type: 'confirm',
          default: false,
        },
      ], cmdOpts);
      if (!opts.yes) {
        console.info('aborted');
        return;
      }
      await pushFixture(await ctx.client(), await ctx.config());
    });

  program.addCommand(fixtureCommand);

  const schemaCommand = new Command('schema');

  schemaCommand.command('pull')
    .description('Pull schema')
    .action(async() => pullSchema(await ctx.client(), await ctx.config()));

  schemaCommand.command('push')
    .description('Push schema')
    .option('-y, --yes', 'Say yes to confirm')
    .action(async(cmdOpts) => {
      const opts = await inquirer.prompt([
        {
          name: 'yes',
          message: 'Are you sure want to push to directus instance?',
          type: 'confirm',
          default: false,
        },
      ], cmdOpts);
      if (!opts.yes) {
        console.info('aborted');
        return;
      }
      await pushSchema(await ctx.client(), await ctx.config());
    });

  program.addCommand(schemaCommand);

  const flowCommand = new Command('flow');

  flowCommand.command('pull')
    .description('Pull flows')
    .action(async() => pullFlow(await ctx.client(), await ctx.config()));

  flowCommand.command('push')
    .description('Push flows')
    .option('-y, --yes', 'Say yes to confirm')
    .action(async(cmdOpts) => {
      const opts = await inquirer.prompt([
        {
          name: 'yes',
          message: 'Are you sure want to push to directus instance?',
          type: 'confirm',
          default: false,
        },
      ], cmdOpts);
      if (!opts.yes) {
        console.info('aborted');
        return;
      }
      await pushFlow(await ctx.client(), await ctx.config());
    });

  program.addCommand(flowCommand);

  const acCommand = new Command('ac');

  acCommand.command('pull')
    .description('Pull access control')
    .action(async() => pullAc(await ctx.client(), await ctx.config()));

  acCommand.command('push')
    .description('Push access control')
    .option('-y, --yes', 'Say yes to confirm')
    .action(async(cmdOpts) => {
      const opts = await inquirer.prompt([
        {
          name: 'yes',
          message: 'Are you sure want to push to directus instance?',
          type: 'confirm',
          default: false,
        },
      ], cmdOpts);
      if (!opts.yes) {
        console.info('aborted');
        return;
      }
      await pushAc(await ctx.client(), await ctx.config());
    });

  program.addCommand(acCommand);

  program.command('pull')
    .description('Pull from directus instance to local')
    .action(async() => pull(await ctx.client(), await ctx.config()));

  program.command('push')
    .description('Push to directus instance from local')
    .option('-y, --yes', 'Say yes to confirm')
    .action(async(cmdOpts) => {
      const opts = await inquirer.prompt([
        {
          name: 'yes',
          message: 'Are you sure want to push to directus instance?',
          type: 'confirm',
          default: false,
        },
      ], cmdOpts);
      if (!opts.yes) {
        console.info('aborted');
        return;
      }
      await push(await ctx.client(), await ctx.config());
    });

  program.command('config')
    .action(async() => showConfig(await ctx.config()));

  (async() => {
    try {
      await program.parseAsync();
    } catch (err) {
      console.error('Error occurred:', err);
      process.exit(1);
    }
  })();
}
