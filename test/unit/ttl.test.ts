import { describe, it, expect } from 'vitest';
import { formatTTL, isAutomaticTTL } from '../../src/utils/ttl';

describe('TTL utilities', () => {
  describe('formatTTL', () => {
    it('should format 1799 as Automatic', () => {
      expect(formatTTL('1799')).toBe('Automatic');
      expect(formatTTL(1799)).toBe('Automatic');
    });

    it('should format 1800 as Automatic', () => {
      expect(formatTTL('1800')).toBe('Automatic');
      expect(formatTTL(1800)).toBe('Automatic');
    });

    it('should return other TTL values as-is', () => {
      expect(formatTTL('300')).toBe('300');
      expect(formatTTL(300)).toBe('300');
      expect(formatTTL('3600')).toBe('3600');
      expect(formatTTL(3600)).toBe('3600');
      expect(formatTTL('60')).toBe('60');
      expect(formatTTL(60)).toBe('60');
    });
  });

  describe('isAutomaticTTL', () => {
    it('should return true for automatic TTL values', () => {
      expect(isAutomaticTTL('1799')).toBe(true);
      expect(isAutomaticTTL(1799)).toBe(true);
      expect(isAutomaticTTL('1800')).toBe(true);
      expect(isAutomaticTTL(1800)).toBe(true);
    });

    it('should return false for other TTL values', () => {
      expect(isAutomaticTTL('300')).toBe(false);
      expect(isAutomaticTTL(300)).toBe(false);
      expect(isAutomaticTTL('3600')).toBe(false);
      expect(isAutomaticTTL(3600)).toBe(false);
      expect(isAutomaticTTL('60')).toBe(false);
      expect(isAutomaticTTL(60)).toBe(false);
    });
  });
});
