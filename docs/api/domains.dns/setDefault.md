## namecheap.domains.dns.setDefault

Sets a domain to use Namecheap's default (free) DNS servers.

**Command:** `namecheap.domains.dns.setDefault`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `SLD` | String | 70 | Yes | Second-level domain (e.g., `example` from `example.com`) |
| `TLD` | String | 10 | Yes | Top-level domain (e.g., `com`) |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Full domain name |
| `Updated` | `True`/`False` — whether nameservers were updated |
| `IsSuccess` | Indicates if the operation succeeded |

> **Note:** The API may return `Status="OK"` but `IsSuccess="false"` if the domain is already using default nameservers.

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.dns.setDefault
  &SLD=example
  &TLD=com
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.dns.setDefault</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.setDefault">
    <DomainDNSSetDefaultResult Domain="example.com" Updated="true" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>1.234</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain is not associated with your account |
| `2030166` | Edit permission for domain is not supported |
| `3013288` | Too many records |
| `3031510` | Error from Enom when Errorcount <> 0 |
| `3050900` | Unknown error from Enom |
| `4022288` | Unable to get nameserver list |
