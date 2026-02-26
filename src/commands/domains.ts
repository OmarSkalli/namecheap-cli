import { ConfigManager } from '../config/manager';
import { NamecheapClient } from '../api/client';
import { OutputFormatter, OutputFormat } from '../utils/output';

export async function domainsListCommand(options: { output?: OutputFormat; sandbox?: boolean }): Promise<void> {
  try {
    const config = ConfigManager.loadConfig();
    const client = new NamecheapClient(config, options.sandbox || false);
    const response = await client.getDomainsList();

    if (response.status === 'ERROR') {
      console.error(OutputFormatter.formatError(response.errors || ['Unknown error']));
      process.exit(1);
    }

    if (!response.data) {
      console.error(OutputFormatter.formatError('No data received from API'));
      process.exit(1);
    }

    const output = OutputFormatter.formatDomainsList(
      response.data.domains,
      options.output || 'table'
    );
    console.log(output);

    if (options.output === 'table' && response.data.paging) {
      console.log(
        `\nShowing ${response.data.domains.length} of ${response.data.paging.totalItems} domains`
      );
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
