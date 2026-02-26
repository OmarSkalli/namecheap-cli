import { ConfigManager } from '../config/manager';
import { NamecheapClient } from '../api/client';
import { OutputFormatter, OutputFormat } from '../utils/output';
import { DomainParser } from '../utils/domain';

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
