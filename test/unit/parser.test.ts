import { describe, it, expect } from 'vitest';
import { ResponseParser } from '../../src/api/parser';

describe('ResponseParser', () => {
  describe('parseDomainsListResponse', () => {
    it('should parse successful response with domains', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="OK" xmlns="http://api.namecheap.com/xml.response">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.getList</RequestedCommand>
  <CommandResponse Type="namecheap.domains.getList">
    <DomainGetListResult>
      <Domain ID="12345" Name="example.com" User="testuser" Created="01/01/2020" Expires="01/01/2025" IsExpired="false" IsLocked="false" AutoRenew="false" WhoisGuard="ENABLED" IsPremium="false" IsOurDNS="true"/>
      <Domain ID="12346" Name="test.com" User="testuser" Created="02/01/2020" Expires="02/01/2025" IsExpired="false" IsLocked="true" AutoRenew="true" WhoisGuard="DISABLED" IsPremium="false" IsOurDNS="false"/>
    </DomainGetListResult>
    <Paging>
      <TotalItems>2</TotalItems>
      <CurrentPage>1</CurrentPage>
      <PageSize>20</PageSize>
    </Paging>
  </CommandResponse>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.234</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDomainsListResponse(xml);

      expect(result.status).toBe('OK');
      expect(result.data?.domains).toHaveLength(2);
      expect(result.data?.domains[0]).toEqual({
        id: '12345',
        name: 'example.com',
        user: 'testuser',
        created: '01/01/2020',
        expires: '01/01/2025',
        isExpired: false,
        isLocked: false,
        autoRenew: false,
        whoisGuard: 'ENABLED',
        isPremium: false,
        isOurDNS: true,
      });
      expect(result.data?.paging).toEqual({
        totalItems: 2,
        currentPage: 1,
        pageSize: 20,
      });
    });

    it('should parse error response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="ERROR" xmlns="http://api.namecheap.com/xml.response">
  <Errors>
    <Error Number="2011166">Invalid API credentials</Error>
  </Errors>
  <Warnings />
  <RequestedCommand>namecheap.domains.getList</RequestedCommand>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.078</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDomainsListResponse(xml);

      expect(result.status).toBe('ERROR');
      expect(result.errors).toContain('Invalid API credentials');
    });

    it('should handle empty domains list', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="OK" xmlns="http://api.namecheap.com/xml.response">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.getList</RequestedCommand>
  <CommandResponse Type="namecheap.domains.getList">
    <DomainGetListResult>
    </DomainGetListResult>
    <Paging>
      <TotalItems>0</TotalItems>
      <CurrentPage>1</CurrentPage>
      <PageSize>20</PageSize>
    </Paging>
  </CommandResponse>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.100</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDomainsListResponse(xml);

      expect(result.status).toBe('OK');
      expect(result.data?.domains).toHaveLength(0);
    });
  });

  describe('parseDnsListResponse', () => {
    it('should parse successful DNS response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="OK" xmlns="http://api.namecheap.com/xml.response">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.getList</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.getList">
    <DomainDNSGetListResult Domain="example.com" IsUsingOurDNS="true">
      <Nameserver>dns1.registrar-servers.com</Nameserver>
      <Nameserver>dns2.registrar-servers.com</Nameserver>
    </DomainDNSGetListResult>
  </CommandResponse>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.156</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDnsListResponse(xml);

      expect(result.status).toBe('OK');
      expect(result.data?.domain).toBe('example.com');
      expect(result.data?.isUsingOurDNS).toBe(true);
      expect(result.data?.nameservers).toEqual([
        'dns1.registrar-servers.com',
        'dns2.registrar-servers.com',
      ]);
    });

    it('should parse error response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="ERROR" xmlns="http://api.namecheap.com/xml.response">
  <Errors>
    <Error Number="2011166">Domain name not found</Error>
  </Errors>
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.getList</RequestedCommand>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.078</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDnsListResponse(xml);

      expect(result.status).toBe('ERROR');
      expect(result.errors).toContain('Domain name not found');
    });
  });

  describe('parseDnsHostsResponse', () => {
    it('should parse successful DNS hosts response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="OK" xmlns="http://api.namecheap.com/xml.response">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.getHosts</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.getHosts">
    <DomainDNSGetHostsResult Domain="example.com" IsUsingOurDNS="true">
      <host HostId="1" Name="@" Type="A" Address="192.0.2.1" MXPref="10" TTL="1800" />
      <host HostId="2" Name="www" Type="CNAME" Address="example.com." MXPref="10" TTL="1800" />
      <host HostId="3" Name="mail" Type="MX" Address="mail.example.com." MXPref="10" TTL="1800" />
    </DomainDNSGetHostsResult>
  </CommandResponse>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.189</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDnsHostsResponse(xml);

      expect(result.status).toBe('OK');
      expect(result.data?.domain).toBe('example.com');
      expect(result.data?.isUsingOurDNS).toBe(true);
      expect(result.data?.hosts).toHaveLength(3);
      expect(result.data?.hosts[0]).toEqual({
        hostId: '1',
        name: '@',
        type: 'A',
        address: '192.0.2.1',
        mxPref: '10',
        ttl: '1800',
      });
      expect(result.data?.hosts[1].type).toBe('CNAME');
      expect(result.data?.hosts[2].type).toBe('MX');
    });

    it('should parse error response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="ERROR" xmlns="http://api.namecheap.com/xml.response">
  <Errors>
    <Error Number="2011166">Domain name not found</Error>
  </Errors>
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.getHosts</RequestedCommand>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.078</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDnsHostsResponse(xml);

      expect(result.status).toBe('ERROR');
      expect(result.errors).toContain('Domain name not found');
    });
  });

  describe('parseDnsSetDefaultResponse', () => {
    it('should parse successful set-default response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="OK" xmlns="http://api.namecheap.com/xml.response">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.setDefault</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.setDefault">
    <DomainDNSSetDefaultResult Domain="example.com" IsSuccess="true" />
  </CommandResponse>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.234</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDnsSetDefaultResponse(xml);

      expect(result.status).toBe('OK');
      expect(result.data?.domain).toBe('example.com');
      expect(result.data?.isSuccess).toBe(true);
    });

    it('should parse error response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="ERROR" xmlns="http://api.namecheap.com/xml.response">
  <Errors>
    <Error Number="2011204">Domain not found</Error>
  </Errors>
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.setDefault</RequestedCommand>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.078</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDnsSetDefaultResponse(xml);

      expect(result.status).toBe('ERROR');
      expect(result.errors).toContain('Domain not found');
    });
  });

  describe('parseDnsSetHostsResponse', () => {
    it('should parse successful set-hosts response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="OK" xmlns="http://api.namecheap.com/xml.response">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.setHosts</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.setHosts">
    <DomainDNSSetHostsResult Domain="example.com" IsSuccess="true" />
  </CommandResponse>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.456</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDnsSetHostsResponse(xml);

      expect(result.status).toBe('OK');
      expect(result.data?.domain).toBe('example.com');
      expect(result.data?.isSuccess).toBe(true);
    });

    it('should parse error response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="ERROR" xmlns="http://api.namecheap.com/xml.response">
  <Errors>
    <Error Number="2019166">Domain not found</Error>
  </Errors>
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.setHosts</RequestedCommand>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.078</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDnsSetHostsResponse(xml);

      expect(result.status).toBe('ERROR');
      expect(result.errors).toContain('Domain not found');
    });

    it('should handle too many records error', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="ERROR" xmlns="http://api.namecheap.com/xml.response">
  <Errors>
    <Error Number="3013288">Too many records</Error>
  </Errors>
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.setHosts</RequestedCommand>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.078</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDnsSetHostsResponse(xml);

      expect(result.status).toBe('ERROR');
      expect(result.errors).toContain('Too many records');
    });
  });

  describe('parseDomainCheckResponse', () => {
    it('should parse successful response with regular domain', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors/>
  <Warnings/>
  <RequestedCommand>namecheap.domains.check</RequestedCommand>
  <CommandResponse Type="namecheap.domains.check">
    <DomainCheckResult Domain="testapi.xyz" Available="false" ErrorNo="0" Description="" IsPremiumName="false" PremiumRegistrationPrice="0" PremiumRenewalPrice="0" PremiumRestorePrice="0" PremiumTransferPrice="0" IcannFee="0" EapFee="0"/>
  </CommandResponse>
  <Server>PHX01APIEXT02</Server>
  <GMTTimeDifference>--4:00</GMTTimeDifference>
  <ExecutionTime>1.358</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDomainCheckResponse(xml);

      expect(result.status).toBe('OK');
      expect(result.data?.domains).toHaveLength(1);
      expect(result.data?.domains[0]).toEqual({
        domain: 'testapi.xyz',
        available: false,
        isPremiumName: false,
        premiumRegistrationPrice: '0',
        premiumRenewalPrice: '0',
        premiumRestorePrice: '0',
        premiumTransferPrice: '0',
        icannFee: '0',
        eapFee: '0',
      });
    });

    it('should parse successful response with premium domain', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors/>
  <Warnings/>
  <RequestedCommand>namecheap.domains.check</RequestedCommand>
  <CommandResponse Type="namecheap.domains.check">
    <DomainCheckResult Domain="us.xyz" Available="true" ErrorNo="0" Description="" IsPremiumName="true" PremiumRegistrationPrice="13000.0000" PremiumRenewalPrice="13000.0000" PremiumRestorePrice="65.0000" PremiumTransferPrice="13000.0000" IcannFee="0.0000" EapFee="0.0000"/>
  </CommandResponse>
  <Server>PHX01APIEXT01</Server>
  <GMTTimeDifference>--4:00</GMTTimeDifference>
  <ExecutionTime>2.647</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDomainCheckResponse(xml);

      expect(result.status).toBe('OK');
      expect(result.data?.domains).toHaveLength(1);
      expect(result.data?.domains[0]).toEqual({
        domain: 'us.xyz',
        available: true,
        isPremiumName: true,
        premiumRegistrationPrice: '13000.0000',
        premiumRenewalPrice: '13000.0000',
        premiumRestorePrice: '65.0000',
        premiumTransferPrice: '13000.0000',
        icannFee: '0.0000',
        eapFee: '0.0000',
      });
    });

    it('should parse multiple domains', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors/>
  <Warnings/>
  <RequestedCommand>namecheap.domains.check</RequestedCommand>
  <CommandResponse Type="namecheap.domains.check">
    <DomainCheckResult Domain="example.com" Available="false" ErrorNo="0" Description="" IsPremiumName="false" PremiumRegistrationPrice="0" PremiumRenewalPrice="0" PremiumRestorePrice="0" PremiumTransferPrice="0" IcannFee="0" EapFee="0"/>
    <DomainCheckResult Domain="available-domain.xyz" Available="true" ErrorNo="0" Description="" IsPremiumName="false" PremiumRegistrationPrice="0" PremiumRenewalPrice="0" PremiumRestorePrice="0" PremiumTransferPrice="0" IcannFee="0" EapFee="0"/>
  </CommandResponse>
  <Server>PHX01APIEXT01</Server>
  <GMTTimeDifference>--4:00</GMTTimeDifference>
  <ExecutionTime>1.234</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDomainCheckResponse(xml);

      expect(result.status).toBe('OK');
      expect(result.data?.domains).toHaveLength(2);
      expect(result.data?.domains[0].domain).toBe('example.com');
      expect(result.data?.domains[0].available).toBe(false);
      expect(result.data?.domains[1].domain).toBe('available-domain.xyz');
      expect(result.data?.domains[1].available).toBe(true);
    });

    it('should parse error response', () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="ERROR" xmlns="http://api.namecheap.com/xml.response">
  <Errors>
    <Error Number="2011169">Only 50 domains are allowed in a single check command</Error>
  </Errors>
  <Warnings />
  <RequestedCommand>namecheap.domains.check</RequestedCommand>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.078</ExecutionTime>
</ApiResponse>`;

      const result = ResponseParser.parseDomainCheckResponse(xml);

      expect(result.status).toBe('ERROR');
      expect(result.errors).toContain('Only 50 domains are allowed in a single check command');
    });
  });
});
