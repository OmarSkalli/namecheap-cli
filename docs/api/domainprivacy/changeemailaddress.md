## namecheap.whoisguard.changeemailaddress

Changes the domain privacy email address (rotates the privacy email).

**Command:** `namecheap.whoisguard.changeemailaddress`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `WhoisguardID` | Number | 10 | Yes | The unique domain privacy ID for which to change the email |

### Returns

| Name | Description |
|------|-------------|
| `ID` | The unique ID of the domain privacy subscription |
| `IsSuccess` | `true`/`false` — whether the email was changed |
| `WGEmail` | The new domain privacy email address |
| `WGOldEmail` | The old domain privacy email address |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.whoisguard.changeEmailAddress</RequestedCommand>
  <CommandResponse Type="namecheap.whoisguard.changeEmailAddress">
    <WhoisguardChangeEmailAddressResult ID="5924316" IsSuccess="true"
      WGEmail="668be12b85d043cf98189a1379eceb12.protect@whoisguard.com"
      WGOldEmail="d3898bfc391e4f92bae0aa2032c4c00e.protect@whoisguard.com" />
  </CommandResponse>
  <Server>API02</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.92</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011331` | Domain privacy does not exist, is not associated with any domain, or is not associated with this user |
