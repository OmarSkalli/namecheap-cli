import * as readline from 'readline';
import chalk from 'chalk';
import { ConfigManager } from '../config/manager';
import { NamecheapClient } from '../api/client';
import { OutputFormatter, OutputFormat } from '../utils/output';
import { DomainParser } from '../utils/domain';
import { DnsValidator } from '../utils/dns-validation';
import { HostRecord } from '../api/types';
import { formatTTL } from '../utils/ttl';

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

/**
 * Add a DNS host record
 */
export async function dnsAddCommand(
  domain: string,
  options: {
    host: string;
    type: string;
    value: string;
    ttl?: number;
    mxPref?: number;
    sandbox?: boolean;
  }
): Promise<void> {
  try {
    if (!DomainParser.validate(domain)) {
      console.error(OutputFormatter.formatError(`Invalid domain format: ${domain}`));
      process.exit(1);
    }

    const ttl = options.ttl || 1799;
    const mxPref = options.mxPref || 10;

    // Validate the record
    const validation = DnsValidator.validateRecord(
      options.host,
      options.type,
      options.value,
      ttl,
      mxPref
    );

    if (!validation.valid) {
      console.error(OutputFormatter.formatError(validation.error || 'Validation failed'));
      process.exit(1);
    }

    const config = ConfigManager.loadConfig();
    const client = new NamecheapClient(config, options.sandbox || false);

    // Get existing hosts
    const hostsResponse = await client.getDnsHosts(domain);

    if (hostsResponse.status === 'ERROR') {
      console.error(OutputFormatter.formatError(hostsResponse.errors || ['Failed to fetch existing DNS records']));
      process.exit(1);
    }

    if (!hostsResponse.data) {
      console.error(OutputFormatter.formatError('No data received from API'));
      process.exit(1);
    }

    // Check if domain uses Namecheap DNS
    if (!hostsResponse.data.isUsingOurDNS) {
      console.error(
        OutputFormatter.formatError(
          `Domain ${domain} is not using Namecheap DNS. Use 'namecheap dns set-defaults ${domain}' first.`
        )
      );
      process.exit(1);
    }

    const existingHosts = hostsResponse.data.hosts;

    // Create new record
    const newRecord: HostRecord = {
      hostId: '0', // Will be assigned by API
      name: options.host,
      type: options.type.toUpperCase(),
      address: options.value,
      ttl: ttl.toString(),
      mxPref: mxPref.toString(),
    };

    // Combine existing and new records
    const allHosts = [...existingHosts, newRecord];

    // Show confirmation
    console.log(chalk.cyan(`\nAdding DNS record to ${chalk.bold(domain)}:\n`));
    console.log(chalk.dim('  Host:  ') + chalk.bold(newRecord.name));
    console.log(chalk.dim('  Type:  ') + chalk.bold(newRecord.type));
    console.log(chalk.dim('  Value: ') + chalk.bold(newRecord.address));
    console.log(chalk.dim('  TTL:   ') + chalk.bold(formatTTL(newRecord.ttl)));
    if (newRecord.type === 'MX' || newRecord.type === 'MXE') {
      console.log(chalk.dim('  MX Preference: ') + chalk.bold(newRecord.mxPref));
    }
    console.log('');

    const confirmation = await prompt(`Type '${domain}' to confirm: `);

    if (confirmation !== domain) {
      console.log(chalk.red('\nConfirmation failed. Operation cancelled.'));
      process.exit(1);
    }

    // Set all hosts (existing + new)
    const setResponse = await client.setDnsHosts(domain, allHosts);

    if (setResponse.status === 'ERROR') {
      console.error(OutputFormatter.formatError(setResponse.errors || ['Unknown error']));
      process.exit(1);
    }

    if (!setResponse.data) {
      console.error(OutputFormatter.formatError('No data received from API'));
      process.exit(1);
    }

    if (setResponse.data.isSuccess) {
      console.log(chalk.green(`\n✓ Successfully added DNS record to ${chalk.bold(domain)}\n`));
    } else {
      const errorMsg =
        setResponse.errors && setResponse.errors.length > 0
          ? setResponse.errors
          : ['Operation failed - the API returned IsSuccess=false'];
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

/**
 * Remove a DNS host record (interactive)
 */
export async function dnsRemoveCommand(
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

    // Get existing hosts
    const hostsResponse = await client.getDnsHosts(domain);

    if (hostsResponse.status === 'ERROR') {
      console.error(OutputFormatter.formatError(hostsResponse.errors || ['Failed to fetch existing DNS records']));
      process.exit(1);
    }

    if (!hostsResponse.data) {
      console.error(OutputFormatter.formatError('No data received from API'));
      process.exit(1);
    }

    // Check if domain uses Namecheap DNS
    if (!hostsResponse.data.isUsingOurDNS) {
      console.error(
        OutputFormatter.formatError(
          `Domain ${domain} is not using Namecheap DNS. Cannot modify DNS records.`
        )
      );
      process.exit(1);
    }

    const existingHosts = hostsResponse.data.hosts;

    if (existingHosts.length === 0) {
      console.log(chalk.yellow(`\nNo DNS records found for ${chalk.bold(domain)}\n`));
      process.exit(0);
    }

    // Display records with indices
    console.log(chalk.cyan(`\nDNS records for ${chalk.bold(domain)}:\n`));
    existingHosts.forEach((host, index) => {
      console.log(chalk.bold(`${index + 1}.`) + chalk.dim(' '));
      console.log(chalk.dim('   Host:  ') + host.name);
      console.log(chalk.dim('   Type:  ') + host.type);
      console.log(chalk.dim('   Value: ') + host.address);
      console.log(chalk.dim('   TTL:   ') + formatTTL(host.ttl));
      if (host.type === 'MX' || host.type === 'MXE') {
        console.log(chalk.dim('   MX Preference: ') + host.mxPref);
      }
      console.log('');
    });

    // Prompt for selection
    const selection = await prompt('Enter the number of the record to remove (or "cancel"): ');

    if (selection.toLowerCase() === 'cancel') {
      console.log(chalk.yellow('\nOperation cancelled.\n'));
      process.exit(0);
    }

    const selectedIndex = parseInt(selection, 10) - 1;

    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= existingHosts.length) {
      console.error(OutputFormatter.formatError('Invalid selection'));
      process.exit(1);
    }

    const recordToRemove = existingHosts[selectedIndex];

    // Show confirmation
    console.log(chalk.yellow(`\nRemoving DNS record from ${chalk.bold(domain)}:\n`));
    console.log(chalk.dim('  Host:  ') + chalk.bold(recordToRemove.name));
    console.log(chalk.dim('  Type:  ') + chalk.bold(recordToRemove.type));
    console.log(chalk.dim('  Value: ') + chalk.bold(recordToRemove.address));
    console.log('');

    const confirmation = await prompt(`Type '${domain}' to confirm: `);

    if (confirmation !== domain) {
      console.log(chalk.red('\nConfirmation failed. Operation cancelled.'));
      process.exit(1);
    }

    // Remove the selected record
    const remainingHosts = existingHosts.filter((_, index) => index !== selectedIndex);

    // Set remaining hosts
    const setResponse = await client.setDnsHosts(domain, remainingHosts);

    if (setResponse.status === 'ERROR') {
      console.error(OutputFormatter.formatError(setResponse.errors || ['Unknown error']));
      process.exit(1);
    }

    if (!setResponse.data) {
      console.error(OutputFormatter.formatError('No data received from API'));
      process.exit(1);
    }

    if (setResponse.data.isSuccess) {
      console.log(chalk.green(`\n✓ Successfully removed DNS record from ${chalk.bold(domain)}\n`));

      // Show command to add the record back
      const addBackCommand = `namecheap dns add ${domain} --host ${recordToRemove.name} --type ${recordToRemove.type} --value ${recordToRemove.address} --ttl ${recordToRemove.ttl}`;
      const fullCommand = recordToRemove.type === 'MX' || recordToRemove.type === 'MXE'
        ? `${addBackCommand} --mx-pref ${recordToRemove.mxPref}`
        : addBackCommand;

      console.log(chalk.dim('Removed by mistake? You can add the record back using:\n'));
      console.log(chalk.cyan(`  ${fullCommand}\n`));
    } else {
      const errorMsg =
        setResponse.errors && setResponse.errors.length > 0
          ? setResponse.errors
          : ['Operation failed - the API returned IsSuccess=false'];
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
