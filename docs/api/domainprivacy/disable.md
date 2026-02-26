## namecheap.whoisguard.disable

Disables domain privacy protection for the specified WhoisguardID.

**Command:** `namecheap.whoisguard.disable`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `WhoisguardID` | Number | 10 | Yes | The unique domain privacy ID to disable |

### Returns

| Name | Description |
|------|-------------|
| `Domainname` | The domain name associated with the subscription |
| `IsSuccess` | `true`/`false` — whether privacy was disabled successfully |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.whoisguard.disable
  &WhoisguardID=38495
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.whoisguard.disable</RequestedCommand>
  <CommandResponse Type="namecheap.whoisguard.disable">
    <WhoisguardDisableResult DomainName="domain1.com" IsSuccess="true" />
  </CommandResponse>
  <Server>API02</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.92</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011331` | Domain privacy does not exist, is not associated with any domain, is already disabled, or is not associated with this user |
