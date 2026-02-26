/**
 * Format TTL value for display
 * Namecheap uses 1799 or 1800 to represent "Automatic" TTL
 */
export function formatTTL(ttl: string | number): string {
  const ttlStr = typeof ttl === 'number' ? ttl.toString() : ttl;

  if (ttlStr === '1799' || ttlStr === '1800') {
    return 'Automatic';
  }

  return ttlStr;
}

/**
 * Check if TTL value represents automatic TTL
 */
export function isAutomaticTTL(ttl: string | number): boolean {
  const ttlStr = typeof ttl === 'number' ? ttl.toString() : ttl;
  return ttlStr === '1799' || ttlStr === '1800';
}
