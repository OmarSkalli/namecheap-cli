## namecheap.domains.ns.getInfo

Retrieves information about a registered nameserver.

**Command:** `namecheap.domains.ns.getInfo`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `SLD` | String | 70 | Yes | Second-level domain |
| `TLD` | String | 10 | Yes | Top-level domain |
| `Nameserver` | String | 255 | Yes | Nameserver hostname to query |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Full domain name |
| `Nameserver` | Nameserver hostname |
| `IP` | Associated IP address(es) |
| `NameserverStatuses` | Registration status |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.ns.getInfo
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
  <RequestedCommand>namecheap.domains.ns.getInfo</RequestedCommand>
  <CommandResponse Type="namecheap.domains.ns.getInfo">
    <DomainNSInfoResult Domain="example.com" Nameserver="ns1.example.com"
                        NameserverStatuses="Active">
      <IP>1.2.3.4</IP>
    </DomainNSInfoResult>
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.456</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain not associated with your account |
| `3031510` | Error from Enom |
| `4022288` | Unable to get nameserver list |
