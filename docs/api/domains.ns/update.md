## namecheap.domains.ns.update

Updates the IP address of a registered nameserver.

**Command:** `namecheap.domains.ns.update`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `SLD` | String | 70 | Yes | Second-level domain |
| `TLD` | String | 10 | Yes | Top-level domain |
| `Nameserver` | String | 255 | Yes | Nameserver hostname to update |
| `OldIP` | String | 15 | Yes | Current/old IP address |
| `IP` | String | 15 | Yes | New IP address |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Full domain name |
| `Nameserver` | Nameserver hostname |
| `IP` | New IP address |
| `IsSuccess` | `True`/`False` |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.ns.update
  &SLD=example
  &TLD=com
  &Nameserver=ns1.example.com
  &OldIP=1.2.3.4
  &IP=5.6.7.8
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.ns.update</RequestedCommand>
  <CommandResponse Type="namecheap.domains.ns.update">
    <DomainNSUpdateResult Domain="example.com" Nameserver="ns1.example.com"
                          IP="5.6.7.8" IsSuccess="true" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>1.123</ExecutionTime>
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
