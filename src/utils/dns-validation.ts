const VALID_RECORD_TYPES = [
  'A',
  'AAAA',
  'ALIAS',
  'CAA',
  'CNAME',
  'MX',
  'MXE',
  'NS',
  'TXT',
  'URL',
  'URL301',
  'FRAME',
];

const MIN_TTL = 60;
const MAX_TTL = 60000;

export class DnsValidator {
  static isValidRecordType(type: string): boolean {
    return VALID_RECORD_TYPES.includes(type.toUpperCase());
  }

  static isValidTTL(ttl: number): boolean {
    return ttl >= MIN_TTL && ttl <= MAX_TTL;
  }

  static validateRecord(
    host: string,
    type: string,
    value: string,
    ttl: number,
    mxPref?: number
  ): { valid: boolean; error?: string } {
    // Validate record type
    if (!this.isValidRecordType(type)) {
      return {
        valid: false,
        error: `Invalid record type: ${type}. Valid types: ${VALID_RECORD_TYPES.join(', ')}`,
      };
    }

    // Validate TTL
    if (!this.isValidTTL(ttl)) {
      return {
        valid: false,
        error: `Invalid TTL: ${ttl}. Must be between ${MIN_TTL} and ${MAX_TTL} seconds`,
      };
    }

    // Validate host name
    if (!host || host.trim() === '') {
      return {
        valid: false,
        error: 'Host name cannot be empty',
      };
    }

    // Validate value
    if (!value || value.trim() === '') {
      return {
        valid: false,
        error: 'Value cannot be empty',
      };
    }

    // Type-specific validation
    const typeUpper = type.toUpperCase();

    if (typeUpper === 'A') {
      if (!this.isValidIPv4(value)) {
        return {
          valid: false,
          error: `Invalid IPv4 address: ${value}`,
        };
      }
    }

    if (typeUpper === 'AAAA') {
      if (!this.isValidIPv6(value)) {
        return {
          valid: false,
          error: `Invalid IPv6 address: ${value}`,
        };
      }
    }

    if (typeUpper === 'MX' || typeUpper === 'MXE') {
      if (mxPref === undefined || mxPref < 0 || mxPref > 65535) {
        return {
          valid: false,
          error: `Invalid MX preference: ${mxPref}. Must be between 0 and 65535`,
        };
      }
    }

    return { valid: true };
  }

  static isValidIPv4(ip: string): boolean {
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ip.match(ipv4Regex);

    if (!match) {
      return false;
    }

    for (let i = 1; i <= 4; i++) {
      const octet = parseInt(match[i], 10);
      if (octet < 0 || octet > 255) {
        return false;
      }
    }

    return true;
  }

  static isValidIPv6(ip: string): boolean {
    // Simplified IPv6 validation - accepts standard and compressed formats
    const ipv6Regex =
      /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
    return ipv6Regex.test(ip);
  }
}
