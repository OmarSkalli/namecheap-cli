export interface NamecheapConfig {
  apiKey: string;
  apiUser: string;
  username: string;
  clientIp: string;
}

export interface ApiResponse<T> {
  status: 'OK' | 'ERROR';
  errors?: string[];
  data?: T;
  executionTime?: string;
  server?: string;
}

export interface Domain {
  id: string;
  name: string;
  user: string;
  created: string;
  expires: string;
  isExpired: boolean;
  isLocked: boolean;
  autoRenew: boolean;
  whoisGuard: string;
  isPremium: boolean;
  isOurDNS: boolean;
}

export interface DomainsListResponse {
  domains: Domain[];
  paging: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
  };
}

export interface DnsListResponse {
  domain: string;
  isUsingOurDNS: boolean;
  nameservers: string[];
}

export interface HostRecord {
  hostId: string;
  name: string;
  type: string;
  address: string;
  mxPref: string;
  ttl: string;
}

export interface DnsHostsResponse {
  domain: string;
  isUsingOurDNS: boolean;
  hosts: HostRecord[];
}

export interface ApiRequestParams {
  command: string;
  [key: string]: string | number | boolean;
}
