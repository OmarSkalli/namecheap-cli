import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NamecheapClient } from '../../src/api/client';
import { NamecheapConfig } from '../../src/api/types';
import * as https from 'https';

vi.mock('https');

describe('NamecheapClient Integration', () => {
  let client: NamecheapClient;
  let config: NamecheapConfig;

  beforeEach(() => {
    config = {
      apiKey: 'test-api-key',
      apiUser: 'testuser',
      username: 'testuser',
      clientIp: '127.0.0.1',
    };
    client = new NamecheapClient(config, true); // Use sandbox for tests
  });

  describe('getDomainsList', () => {
    it('should successfully fetch and parse domains list', async () => {
      const mockXmlResponse = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="OK" xmlns="http://api.namecheap.com/xml.response">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.getList</RequestedCommand>
  <CommandResponse Type="namecheap.domains.getList">
    <DomainGetListResult>
      <Domain ID="12345" Name="example.com" User="testuser" Created="01/01/2020" Expires="01/01/2025" IsExpired="false" IsLocked="false" AutoRenew="false" WhoisGuard="ENABLED" IsPremium="false" IsOurDNS="true"/>
    </DomainGetListResult>
    <Paging>
      <TotalItems>1</TotalItems>
      <CurrentPage>1</CurrentPage>
      <PageSize>20</PageSize>
    </Paging>
  </CommandResponse>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.234</ExecutionTime>
</ApiResponse>`;

      const mockResponse = {
        on: vi.fn((event, handler) => {
          if (event === 'data') {
            handler(mockXmlResponse);
          } else if (event === 'end') {
            handler();
          }
          return mockResponse;
        }),
      };

      vi.mocked(https.get).mockImplementation((url: any, callback: any) => {
        callback(mockResponse);
        return { on: vi.fn() } as any;
      });

      const result = await client.getDomainsList();

      expect(result.status).toBe('OK');
      expect(result.data?.domains).toHaveLength(1);
      expect(result.data?.domains[0].name).toBe('example.com');
    });

    it('should handle API errors', async () => {
      const mockXmlResponse = `<?xml version="1.0" encoding="utf-8"?>
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

      const mockResponse = {
        on: vi.fn((event, handler) => {
          if (event === 'data') {
            handler(mockXmlResponse);
          } else if (event === 'end') {
            handler();
          }
          return mockResponse;
        }),
      };

      vi.mocked(https.get).mockImplementation((url: any, callback: any) => {
        callback(mockResponse);
        return { on: vi.fn() } as any;
      });

      const result = await client.getDomainsList();

      expect(result.status).toBe('ERROR');
      expect(result.errors).toContain('Invalid API credentials');
    });
  });

  describe('getDnsList', () => {
    it('should successfully fetch and parse DNS list', async () => {
      const mockXmlResponse = `<?xml version="1.0" encoding="utf-8"?>
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

      const mockResponse = {
        on: vi.fn((event, handler) => {
          if (event === 'data') {
            handler(mockXmlResponse);
          } else if (event === 'end') {
            handler();
          }
          return mockResponse;
        }),
      };

      vi.mocked(https.get).mockImplementation((url: any, callback: any) => {
        callback(mockResponse);
        return { on: vi.fn() } as any;
      });

      const result = await client.getDnsList('example.com');

      expect(result.status).toBe('OK');
      expect(result.data?.domain).toBe('example.com');
      expect(result.data?.nameservers).toHaveLength(2);
    });

    it('should handle multi-part TLD domains', async () => {
      const mockXmlResponse = `<?xml version="1.0" encoding="utf-8"?>
<ApiResponse Status="OK" xmlns="http://api.namecheap.com/xml.response">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.domains.dns.getList</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.getList">
    <DomainDNSGetListResult Domain="example.co.uk" IsUsingOurDNS="false">
      <Nameserver>ns1.example.com</Nameserver>
    </DomainDNSGetListResult>
  </CommandResponse>
  <Server>WEB1</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.156</ExecutionTime>
</ApiResponse>`;

      const mockResponse = {
        on: vi.fn((event, handler) => {
          if (event === 'data') {
            handler(mockXmlResponse);
          } else if (event === 'end') {
            handler();
          }
          return mockResponse;
        }),
      };

      vi.mocked(https.get).mockImplementation((url: any, callback: any) => {
        callback(mockResponse);
        return { on: vi.fn() } as any;
      });

      const result = await client.getDnsList('example.co.uk');

      expect(result.status).toBe('OK');
      expect(result.data?.domain).toBe('example.co.uk');
    });
  });
});
