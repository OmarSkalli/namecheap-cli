import { XMLParser } from 'fast-xml-parser';
import {
  ApiResponse,
  Domain,
  DomainsListResponse,
  DnsListResponse,
  DnsHostsResponse,
  DnsSetDefaultResponse,
  DomainCheckResponse,
  DomainCheckResult,
  HostRecord,
} from './types';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

export class ResponseParser {
  static parseXml(xml: string): any {
    return parser.parse(xml);
  }

  static extractErrors(parsed: any): string[] {
    const errors: string[] = [];
    const apiResponse = parsed.ApiResponse;

    if (!apiResponse) {
      throw new Error('Invalid API response format');
    }

    if (apiResponse['@_Status'] === 'ERROR' && apiResponse.Errors?.Error) {
      const errorData = apiResponse.Errors.Error;
      if (Array.isArray(errorData)) {
        errors.push(...errorData.map((e: any) => e['#text'] || e));
      } else {
        errors.push(errorData['#text'] || errorData);
      }
    }

    return errors;
  }

  static parseDomainsListResponse(xml: string): ApiResponse<DomainsListResponse> {
    const parsed = this.parseXml(xml);
    const apiResponse = parsed.ApiResponse;
    const errors = this.extractErrors(parsed);

    if (errors.length > 0) {
      return {
        status: 'ERROR',
        errors,
      };
    }

    const commandResponse = apiResponse.CommandResponse;
    const result = commandResponse.DomainGetListResult;
    const paging = commandResponse.Paging;

    const domains: Domain[] = [];
    if (result.Domain) {
      const domainData = Array.isArray(result.Domain) ? result.Domain : [result.Domain];

      for (const d of domainData) {
        domains.push({
          id: d['@_ID'],
          name: d['@_Name'],
          user: d['@_User'],
          created: d['@_Created'],
          expires: d['@_Expires'],
          isExpired: d['@_IsExpired'] === 'true',
          isLocked: d['@_IsLocked'] === 'true',
          autoRenew: d['@_AutoRenew'] === 'true',
          whoisGuard: d['@_WhoisGuard'],
          isPremium: d['@_IsPremium'] === 'true',
          isOurDNS: d['@_IsOurDNS'] === 'true',
        });
      }
    }

    return {
      status: 'OK',
      data: {
        domains,
        paging: {
          totalItems: parseInt(paging.TotalItems, 10),
          currentPage: parseInt(paging.CurrentPage, 10),
          pageSize: parseInt(paging.PageSize, 10),
        },
      },
      executionTime: apiResponse.ExecutionTime,
      server: apiResponse.Server,
    };
  }

  static parseDnsListResponse(xml: string): ApiResponse<DnsListResponse> {
    const parsed = this.parseXml(xml);
    const apiResponse = parsed.ApiResponse;
    const errors = this.extractErrors(parsed);

    if (errors.length > 0) {
      return {
        status: 'ERROR',
        errors,
      };
    }

    const commandResponse = apiResponse.CommandResponse;
    const result = commandResponse.DomainDNSGetListResult;

    const nameservers: string[] = [];
    if (result.Nameserver) {
      if (Array.isArray(result.Nameserver)) {
        nameservers.push(...result.Nameserver);
      } else {
        nameservers.push(result.Nameserver);
      }
    }

    return {
      status: 'OK',
      data: {
        domain: result['@_Domain'],
        isUsingOurDNS: result['@_IsUsingOurDNS'] === 'true',
        nameservers,
      },
      executionTime: apiResponse.ExecutionTime,
      server: apiResponse.Server,
    };
  }

  static parseDnsHostsResponse(xml: string): ApiResponse<DnsHostsResponse> {
    const parsed = this.parseXml(xml);
    const apiResponse = parsed.ApiResponse;
    const errors = this.extractErrors(parsed);

    if (errors.length > 0) {
      return {
        status: 'ERROR',
        errors,
      };
    }

    const commandResponse = apiResponse.CommandResponse;
    const result = commandResponse.DomainDNSGetHostsResult;

    const hosts: HostRecord[] = [];
    if (result.host) {
      const hostData = Array.isArray(result.host) ? result.host : [result.host];

      for (const h of hostData) {
        hosts.push({
          hostId: h['@_HostId'],
          name: h['@_Name'],
          type: h['@_Type'],
          address: h['@_Address'],
          mxPref: h['@_MXPref'] || '10',
          ttl: h['@_TTL'],
        });
      }
    }

    return {
      status: 'OK',
      data: {
        domain: result['@_Domain'],
        isUsingOurDNS: result['@_IsUsingOurDNS'] === 'true',
        hosts,
      },
      executionTime: apiResponse.ExecutionTime,
      server: apiResponse.Server,
    };
  }

  static parseDnsSetDefaultResponse(xml: string): ApiResponse<DnsSetDefaultResponse> {
    const parsed = this.parseXml(xml);
    const apiResponse = parsed.ApiResponse;
    const errors = this.extractErrors(parsed);

    if (errors.length > 0) {
      return {
        status: 'ERROR',
        errors,
      };
    }

    const commandResponse = apiResponse.CommandResponse;
    const result = commandResponse.DomainDNSSetDefaultResult;

    return {
      status: 'OK',
      data: {
        domain: result['@_Domain'],
        isSuccess: result['@_IsSuccess'] === 'true',
      },
      executionTime: apiResponse.ExecutionTime,
      server: apiResponse.Server,
    };
  }

  static parseDomainCheckResponse(xml: string): ApiResponse<DomainCheckResponse> {
    const parsed = this.parseXml(xml);
    const apiResponse = parsed.ApiResponse;
    const errors = this.extractErrors(parsed);

    if (errors.length > 0) {
      return {
        status: 'ERROR',
        errors,
      };
    }

    const commandResponse = apiResponse.CommandResponse;
    const result = commandResponse.DomainCheckResult;

    const domains: DomainCheckResult[] = [];
    if (result) {
      const domainData = Array.isArray(result) ? result : [result];

      for (const d of domainData) {
        domains.push({
          domain: d['@_Domain'],
          available: d['@_Available'] === 'true',
          isPremiumName: d['@_IsPremiumName'] === 'true',
          premiumRegistrationPrice: d['@_PremiumRegistrationPrice'],
          premiumRenewalPrice: d['@_PremiumRenewalPrice'],
          premiumRestorePrice: d['@_PremiumRestorePrice'],
          premiumTransferPrice: d['@_PremiumTransferPrice'],
          icannFee: d['@_IcannFee'],
          eapFee: d['@_EapFee'],
        });
      }
    }

    return {
      status: 'OK',
      data: {
        domains,
      },
      executionTime: apiResponse.ExecutionTime,
      server: apiResponse.Server,
    };
  }
}
