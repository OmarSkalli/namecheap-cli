## namecheap.whoisguard.enable

Enables domain privacy protection for the specified WhoisguardID.

**Command:** `namecheap.whoisguard.enable`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `WhoisguardID` | Number | 10 | Yes | The unique domain privacy ID to enable |
| `ForwardedToEmail` | String | 70 | Yes | Email address to which domain privacy emails are forwarded |

### Returns

| Name | Description |
|------|-------------|
| `DomainName` | The domain name for which privacy was enabled |
| `IsSuccess` | `true`/`false` — whether privacy was enabled successfully |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.whoisguard.enable
  &WhoisguardID=38495
  &ForwardedToEmail=user@example.com
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.whoisguard.enable</RequestedCommand>
  <CommandResponse Type="namecheap.whoisguard.enable">
    <WhoisguardEnableResult DomainName="domain1.com" IsSuccess="true" />
  </CommandResponse>
  <Server>API02</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.92</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011331` | Domain privacy does not exist, is already enabled, is not associated with any domain, or is not associated with this user |
| `2011369` | Domain privacy forwarded email address is not valid |
