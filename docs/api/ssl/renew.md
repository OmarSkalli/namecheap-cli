## namecheap.ssl.renew

Renews an SSL certificate.

**Command:** `namecheap.ssl.renew`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `CertificateID` | Number | 20 | Yes | Certificate ID to renew |
| `Years` | Number | 2 | Yes | Number of years to renew |
| `SSLType` | String | 50 | Yes | Certificate type |
| `PromotionCode` | String | 20 | No | Promotion code |

### Returns

| Name | Description |
|------|-------------|
| `CertificateID` | New certificate ID |
| `IsSuccess` | `True`/`False` |
| `OrderId` | Order ID |
| `TransactionId` | Transaction ID |
| `ChargedAmount` | Amount charged |
| `SSLType` | Certificate type |
| `Years` | Years renewed |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.ssl.renew</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.renew">
    <SSLRenewResult CertificateID="789012" IsSuccess="true"
                    OrderId="2345" TransactionId="6789"
                    ChargedAmount="8.88" SSLType="PositiveSSL" Years="1" />
  </CommandResponse>
</ApiResponse>
```
