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
});
