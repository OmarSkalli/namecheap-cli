import { XMLParser } from 'fast-xml-parser';
import {
  ApiResponse,
  Domain,
  DomainsListResponse,
  DnsListResponse,
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
}
