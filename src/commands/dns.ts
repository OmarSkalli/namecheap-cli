import * as readline from 'readline';
import chalk from 'chalk';
import { ConfigManager } from '../config/manager';
import { NamecheapClient } from '../api/client';
import { OutputFormatter, OutputFormat } from '../utils/output';
import { DomainParser } from '../utils/domain';

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

export async function dnsListCommand(
  domain: string,
  options: { output?: OutputFormat; sandbox?: boolean }
): Promise<void> {
  try {
    if (!DomainParser.validate(domain)) {
      console.error(OutputFormatter.formatError(`Invalid domain format: ${domain}`));
      process.exit(1);
    }

    const config = ConfigManager.loadConfig();
    const client = new NamecheapClient(config, options.sandbox || false);
    const response = await client.getDnsList(domain);

    if (response.status === 'ERROR') {
      console.error(OutputFormatter.formatError(response.errors || ['Unknown error']));
      process.exit(1);
    }

    if (!response.data) {
      console.error(OutputFormatter.formatError('No data received from API'));
      process.exit(1);
    }

    const output = OutputFormatter.formatDnsList(response.data, options.output || 'table');
    console.log(output);
  } catch (error) {
    if (error instanceof Error) {
      console.error(OutputFormatter.formatError(error.message));
    } else {
      console.error(OutputFormatter.formatError('An unknown error occurred'));
    }
    process.exit(1);
  }
}

export async function dnsRecordsCommand(
  domain: string,
  options: { output?: OutputFormat; sandbox?: boolean; table?: boolean }
): Promise<void> {
  try {
    if (!DomainParser.validate(domain)) {
      console.error(OutputFormatter.formatError(`Invalid domain format: ${domain}`));
      process.exit(1);
    }

    const config = ConfigManager.loadConfig();
    const client = new NamecheapClient(config, options.sandbox || false);
    const response = await client.getDnsHosts(domain);

    if (response.status === 'ERROR') {
      console.error(OutputFormatter.formatError(response.errors || ['Unknown error']));
      process.exit(1);
    }

    if (!response.data) {
      console.error(OutputFormatter.formatError('No data received from API'));
      process.exit(1);
    }

    // Default to raw format, use table if --table flag is provided
    const useRaw = !options.table;

    const output = OutputFormatter.formatDnsHosts(
      response.data,
      options.output || 'table',
      useRaw
    );
    console.log(output);
  } catch (error) {
    if (error instanceof Error) {
      console.error(OutputFormatter.formatError(error.message));
    } else {
      console.error(OutputFormatter.formatError('An unknown error occurred'));
    }
    process.exit(1);
  }
}

/**
 * Set domain to use Namecheap's default nameservers
 *
 * Possible API error codes:
 * - 2019166: Domain not found
 * - 2016166: Domain is not associated with your account
 * - 2030166: Edit permission for domain is not supported
 * - 3013288: Too many records
 * - 3031510: Error from Enom when Errorcount <> 0
 * - 3050900: Unknown error from Enom
 * - 4022288: Unable to get nameserver list
 */
export async function dnsSetDefaultsCommand(
  domain: string,
  options: { sandbox?: boolean }
): Promise<void> {
  try {
    if (!DomainParser.validate(domain)) {
      console.error(OutputFormatter.formatError(`Invalid domain format: ${domain}`));
      process.exit(1);
    }

    const config = ConfigManager.loadConfig();
    const client = new NamecheapClient(config, options.sandbox || false);

    // Check current DNS status first
    const currentDnsResponse = await client.getDnsList(domain);
    if (currentDnsResponse.status === 'ERROR') {
      console.error(OutputFormatter.formatError(currentDnsResponse.errors || ['Failed to check current DNS settings']));
      process.exit(1);
    }

    // If already using default nameservers, inform and exit
    if (currentDnsResponse.data?.isUsingOurDNS) {
      console.log(chalk.cyan(`\n${chalk.bold(domain)} is already using Namecheap's default nameservers`));
      console.log(chalk.dim('  Current nameservers:'));
      if (currentDnsResponse.data.nameservers) {
        currentDnsResponse.data.nameservers.forEach(ns => {
          console.log(chalk.dim(`    - ${ns}`));
        });
      }
      console.log('');
      process.exit(0);
    }

    // Show current nameservers and require confirmation
    console.log(chalk.yellow(`\n${chalk.bold(domain)} current nameservers:`));
    if (currentDnsResponse.data?.nameservers) {
      currentDnsResponse.data.nameservers.forEach(ns => {
        console.log(chalk.dim(`  - ${ns}`));
      });
    }
    console.log(chalk.yellow('\nThis will change to Namecheap\'s default nameservers:\n'));
    console.log(chalk.dim('  - dns1.registrar-servers.com'));
    console.log(chalk.dim('  - dns2.registrar-servers.com\n'));

    const confirmation = await prompt(`Type '${domain}' to confirm: `);

    if (confirmation !== domain) {
      console.log(chalk.red('\nConfirmation failed. Operation cancelled.'));
      process.exit(1);
    }

    const response = await client.setDnsDefaults(domain);

    // Debug logging
    if (process.env.DEBUG) {
      console.log('\nAPI Response:', JSON.stringify(response, null, 2));
    }

    if (response.status === 'ERROR') {
      console.error(OutputFormatter.formatError(response.errors || ['Unknown error']));
      process.exit(1);
    }

    if (!response.data) {
      console.error(OutputFormatter.formatError('No data received from API'));
      process.exit(1);
    }

    if (response.data.isSuccess) {
      console.log(chalk.green(`\n✓ Successfully set ${chalk.bold(domain)} to use default nameservers`));
      console.log(chalk.dim('  New nameservers:'));
      console.log(chalk.dim('    - dns1.registrar-servers.com'));
      console.log(chalk.dim('    - dns2.registrar-servers.com\n'));
    } else {
      const errorMsg = response.errors && response.errors.length > 0
        ? response.errors
        : ['Operation failed - the API returned IsSuccess=false. There may be a permission issue or the domain may not support this operation.'];
      console.error(OutputFormatter.formatError(errorMsg));
      process.exit(1);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(OutputFormatter.formatError(error.message));
    } else {
      console.error(OutputFormatter.formatError('An unknown error occurred'));
    }
    process.exit(1);
  }
}
