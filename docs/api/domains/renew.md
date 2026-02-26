## namecheap.domains.renew

Renews an expiring domain.

**Command:** `namecheap.domains.renew`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Domain to renew |
| `Years` | Number | 2 | Yes | Number of years to renew (1-10) |
| `PromotionCode` | String | 20 | No | Promotion code |
| `IsPremiumDomain` | Boolean | — | No | Set `true` for premium domains |
| `PremiumPrice` | Decimal | — | No | Required for premium domains |

### Returns

| Name | Description |
|------|-------------|
| `DomainName` | Domain name |
| `Renew` | `True`/`False` |
| `ChargedAmount` | Amount charged |
| `DomainID` | Domain ID |
| `OrderID` | Order ID |
| `TransactionID` | Transaction ID |
| **DomainDetails** (child element) | |
| `ExpiredDate` | New expiration date |
| `NumYears` | Number of years renewed |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.renew</RequestedCommand>
  <CommandResponse Type="namecheap.domains.renew">
    <DomainRenewResult DomainName="example.com" Renew="true"
                       ChargedAmount="10.87" DomainID="57579"
                       OrderID="1234" TransactionID="5678">
      <DomainDetails>
        <ExpiredDate>02/15/2026</ExpiredDate>
        <NumYears>1</NumYears>
      </DomainDetails>
    </DomainRenewResult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain not associated with your account |
| `3028166` | Domain cannot be renewed (may be expired or not yet renewable) |
