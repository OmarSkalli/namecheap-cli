## namecheap.ssl.create

Creates a new SSL certificate by purchasing it.

**Command:** `namecheap.ssl.create`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `Years` | Number | 2 | Yes | Number of years (1-3) |
| `Type` | String | 50 | Yes | Certificate type (e.g., `PositiveSSL`, `PositiveSSL Multi-Domain`, `EssentialSSL`, `EssentialSSL WildCard`, `InstantSSL`, `InstantSSL Pro`, `PremiumSSL`, `PremiumSSL WildCard`, `EV SSL`, `EV Multi-Domain SSL`, `Multi-Domain SSL`, `PositiveSSL WildCard`, `Unified Communications`) |
| `SANStoADD` | Number | 10 | No | Number of additional SANs (for multi-domain certs) |
| `PromotionCode` | String | 20 | No | Promotion/coupon code |

### Returns

| Name | Description |
|------|-------------|
| `IsSuccess` | `True`/`False` |
| `OrderId` | Order ID |
| `TransactionId` | Transaction ID |
| `ChargedAmount` | Amount charged |
| `SSLCertificate` | Container with certificate details |
| `CertificateID` | Unique certificate ID |
| `Created` | Creation date |
| `SSLType` | Certificate type |
| `Years` | Number of years purchased |
| `Status` | Certificate status |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.ssl.create</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.create">
    <SSLCreateResult IsSuccess="true" OrderId="1234" TransactionId="5678" ChargedAmount="8.88">
      <SSLCertificate CertificateID="123456" Created="02/15/2024"
                      SSLType="PositiveSSL" Years="1" Status="newpurchase" />
    </SSLCreateResult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2010398` | SSL type not available |
| `4022337` | Failed to purchase SSL certificate |
