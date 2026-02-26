# Agent Development Guide

This document provides context for AI coding assistants working on this codebase.

## Project Overview

A TypeScript CLI tool for managing Namecheap domains and DNS via the Namecheap API.

**Current Implementation:**

- `domains.getList` - List all domains
- `domains.dns.getList` - Get DNS nameservers for a domain

## Architecture

```
src/
├── api/
│   ├── client.ts       # HTTP client with sandbox/production support
│   ├── parser.ts       # XML response parser
│   └── types.ts        # TypeScript interfaces
├── commands/
│   ├── init.ts         # Config initialization
│   ├── domains.ts      # Domain commands
│   └── dns.ts          # DNS commands
├── config/
│   └── manager.ts      # Config file management (~/.namecheap/config.json)
├── utils/
│   ├── domain.ts       # Domain parsing (SLD/TLD splitting)
│   └── output.ts       # Table/JSON formatting
└── index.ts            # CLI entry point (commander.js)
```

## API Documentation

**Official Namecheap API Docs:**
https://www.namecheap.com/support/api/methods/

**Key Resources:**

- API Methods: https://www.namecheap.com/support/api/methods/
- Authentication: All requests require ApiUser, ApiKey, UserName, ClientIp
- Response Format: XML (parsed via fast-xml-parser)
- Endpoints:
  - Production: `https://api.namecheap.com/xml.response`
  - Sandbox: `https://api.sandbox.namecheap.com/xml.response`

## Adding New Endpoints

### Step 1: Add Types (src/api/types.ts)

```typescript
export interface NewCommandResponse {
  // Define response shape based on API docs
  field1: string;
  field2: boolean;
}
```

### Step 2: Add Parser (src/api/parser.ts)

```typescript
static parseNewCommandResponse(xml: string): ApiResponse<NewCommandResponse> {
  const parsed = this.parseXml(xml);
  const errors = this.extractErrors(parsed);

  if (errors.length > 0) {
    return { status: 'ERROR', errors };
  }

  const result = parsed.ApiResponse.CommandResponse.ResultNodeName;

  return {
    status: 'OK',
    data: {
      field1: result['@_Field1'],
      field2: result['@_Field2'] === 'true',
    },
  };
}
```

### Step 3: Add Client Method (src/api/client.ts)

```typescript
async newCommand(param: string): Promise<ApiResponse<NewCommandResponse>> {
  const url = this.buildUrl({
    command: 'namecheap.category.commandName',
    Param1: param,
  });

  const xml = await this.makeRequest(url);
  return ResponseParser.parseNewCommandResponse(xml);
}
```

### Step 4: Add Command (src/commands/)

Create a new file or add to existing command file:

```typescript
export async function newCommand(
  param: string,
  options: { output?: OutputFormat; sandbox?: boolean },
): Promise<void> {
  try {
    const config = ConfigManager.loadConfig();
    const client = new NamecheapClient(config, options.sandbox || false);
    const response = await client.newCommand(param);

    if (response.status === "ERROR") {
      console.error(
        OutputFormatter.formatError(response.errors || ["Unknown error"]),
      );
      process.exit(1);
    }

    // Format and display output
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error instanceof Error) {
      console.error(OutputFormatter.formatError(error.message));
    }
    process.exit(1);
  }
}
```

### Step 5: Register Command (src/index.ts)

```typescript
program
  .command("category")
  .description("Manage category")
  .command("action <param>")
  .option("-o, --output <format>", "Output format (table|json)", "table")
  .option("--sandbox", "Use sandbox environment")
  .action(newCommand);
```

### Step 6: Add Tests

- Unit test for parser in `test/unit/parser.test.ts`
- Integration test in `test/integration/api.test.ts`
- Add XML fixture to `test/fixtures/responses.xml`

### Step 7: Update Output Formatter (if needed)

Add formatting method to `src/utils/output.ts` for table display.

## Testing

```bash
# Run all tests
npm test

# Test against sandbox (requires sandbox account)
namecheap <command> --sandbox

# Build
npm run build
```

## Important Patterns

### Sandbox vs Production

- Default is **production**
- Use `--sandbox` flag for testing
- Pass sandbox flag to NamecheapClient constructor: `new NamecheapClient(config, useSandbox)`

### Domain Parsing

Multi-part TLDs (co.uk, com.au) are handled by `DomainParser.parse()`. Use this utility when splitting domains into SLD/TLD for API calls.

### Error Handling

- API errors: Check `response.status === 'ERROR'` and display `response.errors`
- Always use `OutputFormatter.formatError()` for consistent error display
- Exit with code 1 on errors

### Output Formats

- Support both `table` (default) and `json` output
- Use `OutputFormatter` for table display
- Colors: cyan (headers), green (success), yellow (warnings), red (errors), dim (secondary info)

## Color Guidelines

Avoid `chalk.gray` - use these instead:

- `chalk.cyan` - Info text, headers
- `chalk.yellow` - Important notes, warnings
- `chalk.green` - Success, positive values
- `chalk.red` - Errors, expired items
- `chalk.dim` - Secondary/de-emphasized text
- `chalk.bold` - Emphasis

## API Quirks

1. **XML-only responses** - Namecheap API returns XML, not JSON
2. **IP Whitelisting** - API calls will fail if client IP isn't whitelisted
3. **Domain splitting** - Some endpoints need separate SLD and TLD parameters
4. **Pagination** - Domain list supports paging (not implemented yet)
5. **Rate limits** - Sandbox: 20/min, Production: varies by account level

## Future Enhancements

Potential endpoints to add (see API docs for details):

- Domain registration/renewal
- DNS record management (A, CNAME, MX, etc.)
- Domain transfer
- WhoisGuard management
- SSL certificate management
- Email forwarding

## Configuration

User config stored at `~/.namecheap/config.json`:

```json
{
  "apiKey": "...",
  "apiUser": "...",
  "username": "...",
  "clientIp": "..."
}
```

File permissions are set to 0600 (owner read/write only) for security.
