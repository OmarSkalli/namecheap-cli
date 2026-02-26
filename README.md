# Namecheap CLI

A command-line interface tool for managing your Namecheap domains and DNS settings.

## Features

- Manage domains and DNS settings via Namecheap API
- Support for both production and sandbox environments
- Interactive confirmations for destructive operations
- Multiple output formats (table and JSON)
- Secure credential storage

## Supported Commands

### Domain Management
- **`domains list`** - List all domains in your account

### DNS Management
- **`dns list <domain>`** - View DNS nameservers for a domain
- **`dns records <domain>`** - List DNS host records (A, CNAME, MX, etc.)
- **`dns set-defaults <domain>`** - Set domain to use Namecheap's default nameservers

### Configuration
- **`init`** - Initialize CLI with your API credentials

## Installation

### From Source

```bash
npm install
npm run build
npm link
```

### Global Installation (after publishing)

```bash
npm install -g namecheap-cli
```

## Prerequisites

Before using this CLI, you need to:

1. **Enable API Access** in your Namecheap account:
   - Log in to Namecheap
   - Go to Profile > Tools > API Access
   - Enable API access and note your API key

2. **Whitelist Your IP Address**:
   - In the API Access section, add your public IP address to the whitelist
   - API calls from non-whitelisted IPs will be rejected

3. **Get Your Credentials**:
   - API Key (from API Access page)
   - Username (your Namecheap username)
   - API User (usually the same as username)
   - Client IP (your whitelisted public IP)

## Configuration

Initialize the CLI with your Namecheap credentials:

```bash
namecheap init
```

This will prompt you for:
- API Key
- API User (usually your username)
- Username
- Whitelisted Client IP

Your credentials will be securely stored in `~/.namecheap/config.json` with restricted permissions (0600).

**Note:** Commands use the **production API by default**. Use the `--sandbox` flag when testing against the sandbox environment.

## Usage

### List All Domains

List all domains in your account:

```bash
namecheap domains list
```

Options:
- `-o, --output <format>`: Output format (`table` or `json`), default: `table`
- `--sandbox`: Use sandbox environment instead of production

Examples:

```bash
# List domains in table format (default)
namecheap domains list

# List domains in JSON format
namecheap domains list --output json

# List domains in sandbox environment
namecheap domains list --sandbox
```

### List DNS Nameservers

Get DNS nameservers for a specific domain:

```bash
namecheap dns list <domain>
```

Options:
- `-o, --output <format>`: Output format (`table` or `json`), default: `table`
- `--sandbox`: Use sandbox environment instead of production

Examples:

```bash
# Get DNS for a domain
namecheap dns list example.com

# Get DNS in JSON format
namecheap dns list example.com --output json

# Get DNS from sandbox
namecheap dns list example.com --sandbox
```

### List DNS Host Records

Get all DNS host records for a domain (A, CNAME, MX, etc.):

```bash
namecheap dns records <domain>
```

Options:
- `-o, --output <format>`: Output format (`table` or `json`), default: `table`
- `--table`: Display records in table format (default shows raw format)
- `--sandbox`: Use sandbox environment instead of production

Examples:

```bash
# Get DNS records for a domain
namecheap dns records example.com

# Get DNS records in table format
namecheap dns records example.com --table

# Get DNS records in JSON format
namecheap dns records example.com --output json
```

### Set DNS to Namecheap Defaults

Change a domain's nameservers to Namecheap's default DNS servers:

```bash
namecheap dns set-defaults <domain>
```

This command:
- Checks if domain is already using default nameservers
- Shows current nameservers before making changes
- Requires typing the domain name to confirm
- Only proceeds if confirmation matches

Options:
- `--sandbox`: Use sandbox environment instead of production

Examples:

```bash
# Set domain to use Namecheap's default nameservers
namecheap dns set-defaults example.com

# Test against sandbox
namecheap dns set-defaults example.com --sandbox
```

**Note:** This will replace any custom nameservers with Namecheap's defaults:
- `dns1.registrar-servers.com`
- `dns2.registrar-servers.com`

## Development

### Install Dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Development Mode

```bash
npm run dev
```

## Testing

The project includes comprehensive unit and integration tests:

- **Unit Tests**: Test individual utilities (domain parser, XML parser, output formatters)
- **Integration Tests**: Test API client with mocked HTTP responses

Run tests with:

```bash
npm test
```

### Testing with Sandbox

The Namecheap sandbox is a separate testing environment where you can test API calls without affecting real domains.

To use the sandbox:

1. Create a sandbox account at https://www.sandbox.namecheap.com
2. Enable API access and whitelist your IP in the sandbox account
3. Get your sandbox API credentials (separate from production)
4. You can either:
   - Use the same config with `--sandbox` flag (if credentials are the same)
   - Or set up a separate config for sandbox testing

**Using the `--sandbox` flag:**
```bash
# Test commands against sandbox
namecheap domains list --sandbox
namecheap dns list example.com --sandbox
namecheap dns records example.com --sandbox
namecheap dns set-defaults example.com --sandbox
```

**Note:** The sandbox has **separate data** from production - your real domains won't appear in sandbox, and test domains in sandbox won't affect production.

## API Endpoints Implemented

- `namecheap.domains.getList` - List all domains
- `namecheap.domains.dns.getList` - Get DNS nameservers for a domain
- `namecheap.domains.dns.getHosts` - Get DNS host records for a domain
- `namecheap.domains.dns.setDefault` - Set domain to use Namecheap default nameservers

## Project Structure

```
namecheap-cli/
├── src/
│   ├── index.ts              # CLI entry point
│   ├── commands/
│   │   ├── init.ts          # Config initialization
│   │   ├── domains.ts       # Domains commands
│   │   └── dns.ts           # DNS commands
│   ├── api/
│   │   ├── client.ts        # API HTTP client
│   │   ├── types.ts         # TypeScript types
│   │   └── parser.ts        # XML response parser
│   ├── config/
│   │   └── manager.ts       # Config file management
│   └── utils/
│       ├── domain.ts        # Domain parsing utilities
│       └── output.ts        # Output formatting
├── test/
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── fixtures/            # Test fixtures
└── package.json
```

## Security

- API credentials are stored in `~/.namecheap/config.json` with file permissions set to 0600 (read/write for owner only)
- Never commit your `config.json` file to version control
- Always use HTTPS for API requests (enforced)
- Validate all user inputs before making API calls

## Troubleshooting

### "Configuration not found" Error

Run `namecheap init` to set up your credentials.

### "Invalid API credentials" Error

Check that:
1. Your API key is correct
2. Your IP address is whitelisted in Namecheap
3. API access is enabled in your account

### "Domain name not found" Error

Verify that:
1. The domain exists in your account
2. The domain name is spelled correctly
3. You're using the correct environment (production vs sandbox)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
