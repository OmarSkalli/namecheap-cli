import * as https from 'https';
import { URL } from 'url';
import { NamecheapConfig, ApiRequestParams, ApiResponse, DomainsListResponse, DnsListResponse, DnsHostsResponse, DnsSetDefaultResponse, DnsSetHostsResponse, DomainCheckResponse, HostRecord } from './types';
import { ResponseParser } from './parser';

const ENDPOINTS = {
  production: 'https://api.namecheap.com/xml.response',
  sandbox: 'https://api.sandbox.namecheap.com/xml.response',
};

export class NamecheapClient {
  private config: NamecheapConfig;
  private useSandbox: boolean;

  constructor(config: NamecheapConfig, useSandbox: boolean = false) {
    this.config = config;
    this.useSandbox = useSandbox;
  }

  private getEndpoint(): string {
    return this.useSandbox ? ENDPOINTS.sandbox : ENDPOINTS.production;
  }

  private buildUrl(params: ApiRequestParams): string {
    const endpoint = this.getEndpoint();
    const url = new URL(endpoint);

    const allParams = {
      ApiUser: this.config.apiUser,
      ApiKey: this.config.apiKey,
      UserName: this.config.username,
      ClientIp: this.config.clientIp,
      Command: params.command,
      ...params,
    };

    delete (allParams as any).command;

    for (const [key, value] of Object.entries(allParams)) {
      url.searchParams.append(key, String(value));
    }

    return url.toString();
  }

  private async makeRequest(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            resolve(data);
          });
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async getDomainsList(): Promise<ApiResponse<DomainsListResponse>> {
    const url = this.buildUrl({
      command: 'namecheap.domains.getList',
    });

    const xml = await this.makeRequest(url);
    return ResponseParser.parseDomainsListResponse(xml);
  }

  async getDnsList(domain: string): Promise<ApiResponse<DnsListResponse>> {
    const parts = domain.split('.');

    if (parts.length < 2) {
      throw new Error('Invalid domain format');
    }

    const tld = parts.slice(-1)[0];
    const sld = parts.slice(0, -1).join('.');

    const url = this.buildUrl({
      command: 'namecheap.domains.dns.getList',
      SLD: sld,
      TLD: tld,
    });

    const xml = await this.makeRequest(url);
    return ResponseParser.parseDnsListResponse(xml);
  }

  async getDnsHosts(domain: string): Promise<ApiResponse<DnsHostsResponse>> {
    const parts = domain.split('.');

    if (parts.length < 2) {
      throw new Error('Invalid domain format');
    }

    const tld = parts.slice(-1)[0];
    const sld = parts.slice(0, -1).join('.');

    const url = this.buildUrl({
      command: 'namecheap.domains.dns.getHosts',
      SLD: sld,
      TLD: tld,
    });

    const xml = await this.makeRequest(url);
    return ResponseParser.parseDnsHostsResponse(xml);
  }

  async setDnsDefaults(domain: string): Promise<ApiResponse<DnsSetDefaultResponse>> {
    const parts = domain.split('.');

    if (parts.length < 2) {
      throw new Error('Invalid domain format');
    }

    const tld = parts.slice(-1)[0];
    const sld = parts.slice(0, -1).join('.');

    const url = this.buildUrl({
      command: 'namecheap.domains.dns.setDefault',
      SLD: sld,
      TLD: tld,
    });

    const xml = await this.makeRequest(url);
    return ResponseParser.parseDnsSetDefaultResponse(xml);
  }

  async checkDomains(domains: string[]): Promise<ApiResponse<DomainCheckResponse>> {
    const url = this.buildUrl({
      command: 'namecheap.domains.check',
      DomainList: domains.join(','),
    });

    const xml = await this.makeRequest(url);
    return ResponseParser.parseDomainCheckResponse(xml);
  }

  async setDnsHosts(domain: string, hosts: HostRecord[]): Promise<ApiResponse<DnsSetHostsResponse>> {
    const parts = domain.split('.');

    if (parts.length < 2) {
      throw new Error('Invalid domain format');
    }

    const tld = parts.slice(-1)[0];
    const sld = parts.slice(0, -1).join('.');

    const params: ApiRequestParams = {
      command: 'namecheap.domains.dns.setHosts',
      SLD: sld,
      TLD: tld,
      EmailType: 'MX',
    };

    // Add numbered parameters for each host record
    hosts.forEach((host, index) => {
      const num = index + 1;
      params[`HostName${num}`] = host.name;
      params[`RecordType${num}`] = host.type;
      params[`Address${num}`] = host.address;
      params[`TTL${num}`] = host.ttl;
      params[`MXPref${num}`] = host.mxPref;
    });

    const url = this.buildUrl(params);
    const xml = await this.makeRequest(url);
    return ResponseParser.parseDnsSetHostsResponse(xml);
  }
}
