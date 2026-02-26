import { describe, it, expect } from 'vitest';
import { DomainParser } from '../../src/utils/domain';

describe('DomainParser', () => {
  describe('parse', () => {
    it('should parse simple domain', () => {
      const result = DomainParser.parse('example.com');
      expect(result).toEqual({ sld: 'example', tld: 'com' });
    });

    it('should parse subdomain', () => {
      const result = DomainParser.parse('subdomain.example.com');
      expect(result).toEqual({ sld: 'subdomain.example', tld: 'com' });
    });

    it('should parse multi-part TLD (co.uk)', () => {
      const result = DomainParser.parse('example.co.uk');
      expect(result).toEqual({ sld: 'example', tld: 'co.uk' });
    });

    it('should parse subdomain with multi-part TLD', () => {
      const result = DomainParser.parse('subdomain.example.co.uk');
      expect(result).toEqual({ sld: 'subdomain.example', tld: 'co.uk' });
    });

    it('should parse com.au domain', () => {
      const result = DomainParser.parse('example.com.au');
      expect(result).toEqual({ sld: 'example', tld: 'com.au' });
    });

    it('should handle case insensitivity', () => {
      const result = DomainParser.parse('Example.COM');
      expect(result).toEqual({ sld: 'example', tld: 'com' });
    });

    it('should throw error for invalid domain (single part)', () => {
      expect(() => DomainParser.parse('example')).toThrow('Invalid domain format');
    });

    it('should throw error for invalid multi-part TLD domain', () => {
      expect(() => DomainParser.parse('co.uk')).toThrow('Invalid domain format');
    });
  });

  describe('validate', () => {
    it('should validate correct domains', () => {
      expect(DomainParser.validate('example.com')).toBe(true);
      expect(DomainParser.validate('subdomain.example.com')).toBe(true);
      expect(DomainParser.validate('example.co.uk')).toBe(true);
    });

    it('should invalidate incorrect domains', () => {
      expect(DomainParser.validate('example')).toBe(false);
      expect(DomainParser.validate('co.uk')).toBe(false);
      expect(DomainParser.validate('')).toBe(false);
    });
  });
});
