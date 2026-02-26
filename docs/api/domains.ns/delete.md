## namecheap.domains.ns.delete

Deletes a nameserver associated with the requested domain.

**Command:** `namecheap.domains.ns.delete`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `SLD` | String | 70 | Yes | Second-level domain |
| `TLD` | String | 10 | Yes | Top-level domain |
| `Nameserver` | String | 255 | Yes | Nameserver hostname to delete |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Full domain name |
| `Nameserver` | Nameserver hostname |
| `IsSuccess` | `True`/`False` |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.ns.delete
  &SLD=example
  &TLD=com
  &Nameserver=ns1.example.com
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.ns.delete</RequestedCommand>
  <CommandResponse Type="namecheap.domains.ns.delete">
    <DomainNSDeleteResult Domain="example.com" Nameserver="ns1.example.com" IsSuccess="true" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.987</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain not associated with your account |
| `3031510` | Error from Enom |
| `3050900` | Unknown error from Enom |
| `4022288` | Unable to get nameserver list |
