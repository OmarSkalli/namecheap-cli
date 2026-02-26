import Table from 'cli-table3';
import chalk from 'chalk';
import { Domain, DnsListResponse, DnsHostsResponse, DomainCheckResult } from '../api/types';
import { Renderer, RenderFormat } from './renderer';

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

  static formatDnsHosts(data: DnsHostsResponse, format: OutputFormat = 'table', raw: boolean = false): string {
    const renderFormat: RenderFormat = format === 'json' ? 'json' : (raw ? 'raw' : 'table');

    const title = `Found ${data.hosts.length} DNS record${data.hosts.length !== 1 ? 's' : ''} for ${chalk.cyan(data.domain)}:`;

    // Transform hosts data to include formatted record type
    const records = data.hosts.map(host => ({
      recordType: `${host.type} Record`,
      hostname: host.name === '@' ? '@' : host.name,
      type: host.type,
      value: host.address,
      priority: host.mxPref,
      ttl: (host.ttl === '1799' || host.ttl === '1800') ? 'Automatic' : host.ttl,
    }));

    return Renderer.render(records, {
      format: renderFormat,
      title: renderFormat !== 'json' ? title : undefined,
      fields: [
        {
          label: renderFormat === 'raw' ? 'Type:' : 'Type',
          key: 'recordType',
          format: (v) => renderFormat === 'raw' ? chalk.bold(chalk.cyan(v)) : v,
          maxWidth: 15,
        },
        {
          label: renderFormat === 'raw' ? 'Hostname:' : 'Hostname',
          key: 'hostname',
          maxWidth: 20,
        },
        {
          label: renderFormat === 'raw' ? 'Value:' : 'Value',
          key: 'value',
          maxWidth: 50,
        },
        {
          label: renderFormat === 'raw' ? 'Priority:' : 'Priority',
          key: 'priority',
          hideIfEmpty: true,
          format: (v, item) => {
            // Only show for MX records
            if (item && item.type !== 'MX') return '-';
            return v;
          },
          maxWidth: 10,
        },
        {
          label: renderFormat === 'raw' ? 'TTL:' : 'TTL',
          key: 'ttl',
          maxWidth: 12,
        },
      ],
    });
  }

  static formatError(error: string | string[]): string {
    const errors = Array.isArray(error) ? error : [error];
    return chalk.red('Error: ') + errors.join('\n       ');
  }

  static formatSuccess(message: string): string {
    return chalk.green(message);
  }

  static formatDomainCheck(domains: DomainCheckResult[], format: OutputFormat = 'table'): string {
    if (format === 'json') {
      return JSON.stringify(domains, null, 2);
    }

    if (domains.length === 0) {
      return chalk.yellow('No domains checked.');
    }

    const table = new Table({
      head: [
        chalk.cyan('Domain'),
        chalk.cyan('Available'),
        chalk.cyan('Premium'),
        chalk.cyan('Reg. Price'),
      ],
    });

    for (const domain of domains) {
      const available = domain.available ? chalk.green('Yes') : chalk.red('No');
      const premium = domain.isPremiumName ? chalk.yellow('Yes') : chalk.dim('No');
      const price = domain.isPremiumName && domain.premiumRegistrationPrice
        ? chalk.yellow(`$${domain.premiumRegistrationPrice}`)
        : chalk.dim('-');

      table.push([
        domain.domain,
        available,
        premium,
        price,
      ]);
    }

    return table.toString();
  }
}
