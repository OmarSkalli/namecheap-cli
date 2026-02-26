## namecheap.domains.ns.create

Creates a new nameserver for the domain.

**Command:** `namecheap.domains.ns.create`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `SLD` | String | 70 | Yes | Second-level domain (e.g., `example` from `example.com`) |
| `TLD` | String | 10 | Yes | Top-level domain (e.g., `com`) |
| `Nameserver` | String | 255 | Yes | Nameserver hostname to create (e.g., `ns1.example.com`) |
| `IP` | String | 15 | Yes | IP address to assign to the nameserver |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Full domain name |
| `Nameserver` | Nameserver hostname |
| `IP` | IP address assigned |
| `IsSuccess` | `True`/`False` — whether creation succeeded |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.ns.create
  &SLD=example
  &TLD=com
  &Nameserver=ns1.example.com
  &IP=1.2.3.4
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.ns.create</RequestedCommand>
  <CommandResponse Type="namecheap.domains.ns.create">
    <DomainNSCreateResult Domain="example.com" Nameserver="ns1.example.com"
                          IP="1.2.3.4" IsSuccess="true" />
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
| `2016166` | Domain not associated with your account |
| `2030166` | Edit permission not supported |
| `3013288` | Too many nameservers |
| `3031510` | Error from Enom |
| `3050900` | Unknown error from Enom |
| `4022288` | Unable to get nameserver list |
