import Table from 'cli-table3';
import chalk from 'chalk';
import { Domain, DnsListResponse } from '../api/types';

export type OutputFormat = 'table' | 'json';

export class OutputFormatter {
  static formatDomainsList(domains: Domain[], format: OutputFormat = 'table'): string {
    if (format === 'json') {
      return JSON.stringify(domains, null, 2);
    }

    if (domains.length === 0) {
      return chalk.yellow('No domains found.');
    }

    const table = new Table({
      head: [
        chalk.cyan('Domain'),
        chalk.cyan('Created'),
        chalk.cyan('Expires'),
        chalk.cyan('Auto-Renew'),
        chalk.cyan('Locked'),
        chalk.cyan('WhoisGuard'),
      ],
    });

    for (const domain of domains) {
      table.push([
        domain.name,
        domain.created,
        domain.isExpired ? chalk.red(domain.expires) : domain.expires,
        domain.autoRenew ? chalk.green('Yes') : chalk.dim('No'),
        domain.isLocked ? chalk.yellow('Yes') : chalk.dim('No'),
        domain.whoisGuard,
      ]);
    }

    return table.toString();
  }

  static formatDnsList(data: DnsListResponse, format: OutputFormat = 'table'): string {
    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    }

    const output: string[] = [];

    output.push(chalk.bold(`Domain: ${data.domain}`));
    output.push(
      `Using Namecheap DNS: ${data.isUsingOurDNS ? chalk.green('Yes') : chalk.yellow('No')}`
    );
    output.push('');
    output.push(chalk.cyan('Nameservers:'));

    for (const ns of data.nameservers) {
      output.push(`  ${ns}`);
    }

    return output.join('\n');
  }

  static formatError(error: string | string[]): string {
    const errors = Array.isArray(error) ? error : [error];
    return chalk.red('Error: ') + errors.join('\n       ');
  }

  static formatSuccess(message: string): string {
    return chalk.green(message);
  }
}
