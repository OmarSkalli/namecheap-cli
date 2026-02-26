## namecheap.domains.check

Checks the availability of one or more domains.

**Command:** `namecheap.domains.check`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainList` | String | 3000 | Yes | Comma-separated list of domain names to check (max 50) |

### Returns

One `DomainCheckResult` element per domain:

| Name | Description |
|------|-------------|
| `Domain` | Domain name checked |
| `Available` | `True`/`False` — whether domain is available |
| `ErrorNo` | Error number (if any) |
| `Description` | Error description |
| `IsPremiumName` | `True`/`False` — premium domain |
| `PremiumRegistrationPrice` | Price for premium registration |
| `PremiumRenewalPrice` | Price for premium renewal |
| `PremiumRestorePrice` | Price for premium restore |
| `PremiumTransferPrice` | Price for premium transfer |
| `IcannFee` | ICANN fee |
| `EapFee` | Early Access Program fee (if applicable) |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.check
  &DomainList=example.com,example.net
  &[auth params]
```

### Example Response

Regular domain:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.check</RequestedCommand>
  <CommandResponse Type="namecheap.domains.check">
    <DomainCheckResult Domain="example.com" Available="false"
                       ErrorNo="0" Description=""
                       IsPremiumName="false" PremiumRegistrationPrice="0"
                       PremiumRenewalPrice="0" PremiumRestorePrice="0"
                       PremiumTransferPrice="0" IcannFee="0" EapFee="0" />
    <DomainCheckResult Domain="example.net" Available="false"
                       ErrorNo="0" Description=""
                       IsPremiumName="false" PremiumRegistrationPrice="0"
                       PremiumRenewalPrice="0" PremiumRestorePrice="0"
                       PremiumTransferPrice="0" IcannFee="0" EapFee="0" />
  </CommandResponse>
</ApiResponse>
```

Premium domain:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.check</RequestedCommand>
  <CommandResponse Type="namecheap.domains.check">
    <DomainCheckResult Domain="premiumdomain.com" Available="true"
                       ErrorNo="0" Description=""
                       IsPremiumName="true" PremiumRegistrationPrice="499.00"
                       PremiumRenewalPrice="50.00" PremiumRestorePrice="0"
                       PremiumTransferPrice="499.00" IcannFee="0" EapFee="0" />
  </CommandResponse>
</ApiResponse>
```
