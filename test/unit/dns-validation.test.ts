import { describe, it, expect } from 'vitest';
import { DnsValidator } from '../../src/utils/dns-validation';

describe('DnsValidator', () => {
  describe('isValidRecordType', () => {
    it('should accept valid record types', () => {
      expect(DnsValidator.isValidRecordType('A')).toBe(true);
      expect(DnsValidator.isValidRecordType('AAAA')).toBe(true);
      expect(DnsValidator.isValidRecordType('CNAME')).toBe(true);
      expect(DnsValidator.isValidRecordType('MX')).toBe(true);
      expect(DnsValidator.isValidRecordType('TXT')).toBe(true);
      expect(DnsValidator.isValidRecordType('NS')).toBe(true);
      expect(DnsValidator.isValidRecordType('URL')).toBe(true);
      expect(DnsValidator.isValidRecordType('URL301')).toBe(true);
      expect(DnsValidator.isValidRecordType('FRAME')).toBe(true);
      expect(DnsValidator.isValidRecordType('ALIAS')).toBe(true);
      expect(DnsValidator.isValidRecordType('CAA')).toBe(true);
      expect(DnsValidator.isValidRecordType('MXE')).toBe(true);
    });

    it('should accept lowercase record types', () => {
      expect(DnsValidator.isValidRecordType('a')).toBe(true);
      expect(DnsValidator.isValidRecordType('cname')).toBe(true);
      expect(DnsValidator.isValidRecordType('mx')).toBe(true);
    });

    it('should reject invalid record types', () => {
      expect(DnsValidator.isValidRecordType('INVALID')).toBe(false);
      expect(DnsValidator.isValidRecordType('SRV')).toBe(false);
      expect(DnsValidator.isValidRecordType('')).toBe(false);
    });
  });

  describe('isValidTTL', () => {
    it('should accept valid TTL values', () => {
      expect(DnsValidator.isValidTTL(60)).toBe(true);
      expect(DnsValidator.isValidTTL(300)).toBe(true);
      expect(DnsValidator.isValidTTL(1800)).toBe(true);
      expect(DnsValidator.isValidTTL(3600)).toBe(true);
      expect(DnsValidator.isValidTTL(60000)).toBe(true);
    });

    it('should reject TTL values outside valid range', () => {
      expect(DnsValidator.isValidTTL(59)).toBe(false);
      expect(DnsValidator.isValidTTL(60001)).toBe(false);
      expect(DnsValidator.isValidTTL(0)).toBe(false);
      expect(DnsValidator.isValidTTL(-1)).toBe(false);
    });
  });

  describe('isValidIPv4', () => {
    it('should accept valid IPv4 addresses', () => {
      expect(DnsValidator.isValidIPv4('192.168.1.1')).toBe(true);
      expect(DnsValidator.isValidIPv4('10.0.0.1')).toBe(true);
      expect(DnsValidator.isValidIPv4('255.255.255.255')).toBe(true);
      expect(DnsValidator.isValidIPv4('0.0.0.0')).toBe(true);
    });

    it('should reject invalid IPv4 addresses', () => {
      expect(DnsValidator.isValidIPv4('256.1.1.1')).toBe(false);
      expect(DnsValidator.isValidIPv4('192.168.1')).toBe(false);
      expect(DnsValidator.isValidIPv4('192.168.1.1.1')).toBe(false);
      expect(DnsValidator.isValidIPv4('abc.def.ghi.jkl')).toBe(false);
      expect(DnsValidator.isValidIPv4('')).toBe(false);
    });
  });

  describe('isValidIPv6', () => {
    it('should accept valid IPv6 addresses', () => {
      expect(DnsValidator.isValidIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
      expect(DnsValidator.isValidIPv6('2001:db8:85a3::8a2e:370:7334')).toBe(true);
      expect(DnsValidator.isValidIPv6('::1')).toBe(true);
      expect(DnsValidator.isValidIPv6('::')).toBe(true);
      expect(DnsValidator.isValidIPv6('fe80::1')).toBe(true);
    });

    it('should reject invalid IPv6 addresses', () => {
      expect(DnsValidator.isValidIPv6('192.168.1.1')).toBe(false);
      expect(DnsValidator.isValidIPv6('gggg::1')).toBe(false);
      expect(DnsValidator.isValidIPv6('')).toBe(false);
    });
  });

  describe('validateRecord', () => {
    it('should validate A record', () => {
      const result = DnsValidator.validateRecord('@', 'A', '192.168.1.1', 1800);
      expect(result.valid).toBe(true);
    });

    it('should reject A record with invalid IP', () => {
      const result = DnsValidator.validateRecord('@', 'A', '256.1.1.1', 1800);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid IPv4 address');
    });

    it('should validate AAAA record', () => {
      const result = DnsValidator.validateRecord('@', 'AAAA', '2001:db8::1', 1800);
      expect(result.valid).toBe(true);
    });

    it('should reject AAAA record with invalid IPv6', () => {
      const result = DnsValidator.validateRecord('@', 'AAAA', '192.168.1.1', 1800);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid IPv6 address');
    });

    it('should validate MX record', () => {
      const result = DnsValidator.validateRecord('@', 'MX', 'mail.example.com', 1800, 10);
      expect(result.valid).toBe(true);
    });

    it('should reject MX record without MX preference', () => {
      const result = DnsValidator.validateRecord('@', 'MX', 'mail.example.com', 1800);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid MX preference');
    });

    it('should reject invalid record type', () => {
      const result = DnsValidator.validateRecord('@', 'INVALID', 'value', 1800);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid record type');
    });

    it('should reject invalid TTL', () => {
      const result = DnsValidator.validateRecord('@', 'A', '192.168.1.1', 30);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid TTL');
    });

    it('should reject empty host name', () => {
      const result = DnsValidator.validateRecord('', 'A', '192.168.1.1', 1800);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Host name cannot be empty');
    });

    it('should reject empty value', () => {
      const result = DnsValidator.validateRecord('@', 'A', '', 1800);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Value cannot be empty');
    });
  });
});
