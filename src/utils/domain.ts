export interface DomainParts {
  sld: string;
  tld: string;
}

const MULTI_PART_TLDS = [
  'co.uk',
  'com.au',
  'co.nz',
  'co.za',
  'com.br',
  'co.in',
  'com.mx',
  'com.ar',
  'com.co',
  'net.au',
  'org.au',
  'gov.au',
  'ac.uk',
  'gov.uk',
  'org.uk',
];

export class DomainParser {
  static parse(domain: string): DomainParts {
    const lowercaseDomain = domain.toLowerCase();
    const parts = lowercaseDomain.split('.');

    if (parts.length < 2) {
      throw new Error(`Invalid domain format: ${domain}`);
    }

    // Check if the entire domain is just a multi-part TLD without SLD
    if (MULTI_PART_TLDS.includes(lowercaseDomain)) {
      throw new Error(`Invalid domain format: ${domain}`);
    }

    // Check for multi-part TLDs
    for (const multiTld of MULTI_PART_TLDS) {
      if (lowercaseDomain.endsWith(`.${multiTld}`)) {
        const tldParts = multiTld.split('.');
        const tld = tldParts.join('.');
        const sld = parts.slice(0, parts.length - tldParts.length).join('.');

        if (!sld) {
          throw new Error(`Invalid domain format: ${domain}`);
        }

        return { sld, tld };
      }
    }

    // Parse regular domain
    const tld = parts[parts.length - 1];
    const sld = parts.slice(0, -1).join('.');

    if (!sld) {
      throw new Error(`Invalid domain format: ${domain}`);
    }

    return { sld, tld };
  }

  static validate(domain: string): boolean {
    try {
      const { sld, tld } = this.parse(domain);
      return Boolean(sld && tld);
    } catch {
      return false;
    }
  }
}
