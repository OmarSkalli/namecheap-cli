## namecheap.domains.dns.setCustom

Sets a domain to use custom DNS servers.

**Command:** `namecheap.domains.dns.setCustom`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `SLD` | String | 70 | Yes | Second-level domain |
| `TLD` | String | 10 | Yes | Top-level domain |
| `Nameservers` | String | 1000 | Yes | Comma-separated list of nameservers (minimum 2, maximum 12) |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Full domain name |
| `Update` | `True`/`False` — whether nameservers were updated |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.dns.setCustom
  &SLD=example
  &TLD=com
  &Nameservers=ns1.yourserver.com,ns2.yourserver.com
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.dns.setCustom</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.setCustom">
    <DomainDNSSetCustomResult Domain="example.com" Update="true" />
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain is not associated with your account |
| `2030166` | Edit permission for domain is not supported |
| `3031510` | Error from Enom when Errorcount <> 0 |
| `4022288` | Unable to get nameserver list |
