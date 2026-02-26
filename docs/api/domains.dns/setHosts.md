## namecheap.domains.dns.setHosts

Sets DNS host records for the requested domain.

**Command:** `namecheap.domains.dns.setHosts`

> **Important:** This method **replaces all** existing host records. Always include all records you want to keep.

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `SLD` | String | 70 | Yes | Second-level domain |
| `TLD` | String | 10 | Yes | Top-level domain |
| `HostName1` | String | 255 | Yes | Hostname for first record (e.g., `@`, `www`) |
| `RecordType1` | String | 10 | Yes | Type: `A`, `AAAA`, `CNAME`, `MX`, `MXE`, `TXT`, `URL`, `URL301`, `FRAME` |
| `Address1` | String | 255 | Yes | Value/destination for first record |
| `MXPref1` | Number | 10 | No | MX preference for first record (for MX records) |
| `TTL1` | Number | 10 | No | TTL in seconds. Default: `1800` (Automatic) |
| `HostName2` | String | 255 | No | Hostname for second record |
| `RecordType2` | String | 10 | No | Type for second record |
| `Address2` | String | 255 | No | Value for second record |
| ... | ... | ... | ... | Up to 150 records (`HostNameN`, `RecordTypeN`, `AddressN`, etc.) |
| `EmailType` | String | 10 | No | `MXE`, `MX`, `FWD`, `OX`, `NONE`. Default: `MXE` |

### Record Types

| Type | Description |
|------|-------------|
| `A` | IPv4 address record |
| `AAAA` | IPv6 address record |
| `CNAME` | Canonical name (alias) |
| `MX` | Mail exchange record |
| `MXE` | Mail exchange with email forwarding |
| `TXT` | Text record (SPF, DKIM, etc.) |
| `URL` | 302 redirect |
| `URL301` | 301 permanent redirect |
| `FRAME` | Frame redirect |
| `CAA` | Certification Authority Authorization |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Full domain name |
| `IsSuccess` | `True`/`False` — whether records were updated |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.dns.setHosts
  &SLD=example
  &TLD=com
  &HostName1=@
  &RecordType1=A
  &Address1=1.2.3.4
  &TTL1=1800
  &HostName2=www
  &RecordType2=CNAME
  &Address2=example.com.
  &TTL2=1800
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.dns.setHosts</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.setHosts">
    <DomainDNSSetHostsResult Domain="example.com" IsSuccess="true" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>1.523</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain is not associated with your account |
| `2030166` | Edit permission not supported (domain uses custom DNS) |
| `3013288` | Too many records |
| `4022288` | Unable to get nameserver list |
