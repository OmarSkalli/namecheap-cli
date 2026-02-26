## namecheap.domains.dns.getList

Gets a list of DNS servers associated with the requested domain.

**Command:** `namecheap.domains.dns.getList`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `SLD` | String | 70 | Yes | Second-level domain |
| `TLD` | String | 10 | Yes | Top-level domain |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Full domain name |
| `IsUsingOurDNS` | `True`/`False` — whether Namecheap DNS is being used |
| `Nameserver` | Nameserver hostname(s) |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.dns.getList
  &SLD=example
  &TLD=com
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.dns.getList</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.getList">
    <DomainDNSGetListResult Domain="example.com" IsUsingOurDNS="True">
      <Nameserver>dns1.registrar-servers.com</Nameserver>
      <Nameserver>dns2.registrar-servers.com</Nameserver>
    </DomainDNSGetListResult>
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.041</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain is not associated with your account |
| `4022288` | Unable to get nameserver list |
