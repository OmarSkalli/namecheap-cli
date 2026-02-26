import Table from 'cli-table3';
import chalk from 'chalk';

export type RenderFormat = 'table' | 'json' | 'raw';

export interface RenderField {
  label: string;
  key: string;
  format?: (value: any, item?: any) => string;
  hideIfEmpty?: boolean;
  maxWidth?: number; // Max width for table truncation
}

export interface RenderOptions {
  format: RenderFormat;
  title?: string;
  fields: RenderField[];
}

export class Renderer {
  static render(data: any[], options: RenderOptions): string {
    if (options.format === 'json') {
      return JSON.stringify(data, null, 2);
    }

    if (data.length === 0) {
      return chalk.yellow('No records found.');
    }

    const output: string[] = [];

    // Add title if provided
    if (options.title) {
      output.push(options.title);
      output.push('');
    }

    if (options.format === 'raw') {
      // Raw format: structured key-value pairs
      for (const item of data) {
        for (const field of options.fields) {
          const value = item[field.key];
          const formattedValue = field.format ? field.format(value, item) : value;

          // Skip empty fields if hideIfEmpty is true
          if (field.hideIfEmpty && (!value || value === '-' || formattedValue === '-')) {
            continue;
          }

          output.push(`  ${field.label.padEnd(11)} ${formattedValue}`);
        }
        output.push(''); // Blank line between records
      }
    } else {
      // Table format
      const headers = options.fields.map(f => chalk.cyan(f.label));
      const table = new Table({ head: headers });

      for (const item of data) {
        const row = options.fields.map(field => {
          const value = item[field.key];
          let formattedValue = field.format ? field.format(value, item) : value;

          // Truncate if maxWidth is specified and value is too long
          if (field.maxWidth && formattedValue && formattedValue.length > field.maxWidth) {
            formattedValue = formattedValue.substring(0, field.maxWidth - 3) + '...';
          }

          return formattedValue;
        });
        table.push(row);
      }

      output.push(table.toString());
    }

    return output.join('\n');
  }
}
