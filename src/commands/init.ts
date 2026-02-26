import * as readline from 'readline';
import chalk from 'chalk';
import { ConfigManager } from '../config/manager';
import { NamecheapConfig } from '../api/types';

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export async function initCommand(): Promise<void> {
  console.log(chalk.bold('\nNamecheap CLI Configuration\n'));
  console.log('Please enter your Namecheap API credentials.');
  console.log(
    chalk.cyan(
      'You can find these in your Namecheap account under Profile > Tools > API Access.\n'
    )
  );

  try {
    const apiKey = await prompt('API Key: ');
    const apiUser = await prompt('API User (usually your username): ');
    const username = await prompt('Username: ');
    const clientIp = await prompt('Whitelisted Client IP: ');

    if (!apiKey || !apiUser || !username || !clientIp) {
      console.error(chalk.red('All fields are required.'));
      process.exit(1);
    }

    const config: NamecheapConfig = {
      apiKey,
      apiUser,
      username,
      clientIp,
    };

    ConfigManager.saveConfig(config);

    console.log(
      chalk.green(`\nConfiguration saved to ${ConfigManager.getConfigPath()}`)
    );
    console.log(chalk.yellow('Commands will use production API by default.'));
    console.log(chalk.yellow('Use --sandbox flag to test against sandbox environment.\n'));
  } catch (error) {
    console.error(chalk.red('Failed to save configuration:'), error);
    process.exit(1);
  }
}
