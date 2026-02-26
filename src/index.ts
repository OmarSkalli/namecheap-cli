#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { domainsListCommand, domainCheckCommand } from './commands/domains';
import { dnsListCommand, dnsRecordsCommand, dnsSetDefaultsCommand } from './commands/dns';

const program = new Command();

program
  .name('namecheap')
  .description('CLI tool for managing Namecheap domains and DNS')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize Namecheap CLI configuration')
  .action(initCommand);

const domainsCommand = program
  .command('domains')
  .description('Manage domains');

domainsCommand
  .command('list')
  .description('List all domains in your account')
  .option('-o, --output <format>', 'Output format (table|json)', 'table')
  .option('--sandbox', 'Use sandbox environment')
  .action(domainsListCommand);

domainsCommand
  .command('check <domains...>')
  .description('Check availability of one or more domains')
  .option('-o, --output <format>', 'Output format (table|json)', 'table')
  .option('--sandbox', 'Use sandbox environment')
  .action(domainCheckCommand);

const dnsCommand = program
  .command('dns')
  .description('Manage DNS settings');

dnsCommand
  .command('list <domain>')
  .description('List DNS nameservers for a domain')
  .option('-o, --output <format>', 'Output format (table|json)', 'table')
  .option('--sandbox', 'Use sandbox environment')
  .action(dnsListCommand);

dnsCommand
  .command('records <domain>')
  .description('List DNS host records for a domain (A, CNAME, MX, etc.)')
  .option('-o, --output <format>', 'Output format (json)', 'table')
  .option('--table', 'Display records in table format')
  .option('--sandbox', 'Use sandbox environment')
  .action(dnsRecordsCommand);

dnsCommand
  .command('set-defaults <domain>')
  .description('Set domain to use Namecheap default nameservers')
  .option('--sandbox', 'Use sandbox environment')
  .action(dnsSetDefaultsCommand);

program.parse();
