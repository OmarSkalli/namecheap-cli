## namecheap.ssl.getInfo

Retrieves information about the requested SSL certificate.

**Command:** `namecheap.ssl.getInfo`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `CertificateID` | Number | 20 | Yes | Certificate ID |
| `Returncertificate` | Boolean | — | No | Set `true` to include the certificate body |
| `Returntype` | String | 20 | No | `Individual`/`PKCS7` — certificate format when `Returncertificate=true` |

### Returns

| Name | Description |
|------|-------------|
| `Status` | Certificate status (e.g., `active`, `newpurchase`, `expired`) |
| `Type` | Certificate type |
| `IsExpired` | Whether certificate is expired |
| `Years` | Years purchased |
| `OrderId` | Order ID |
| `ProductCode` | Product code |
| `PurchasedAt` | Purchase date |
| `ExpiredAt` | Expiration date |
| `HostName` | Hostname on certificate |
| `Provider` | CA provider |
| `SANSCount` | Number of SANs |
| `CertificateDetails` | Full certificate details when requested |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.ssl.getInfo</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.getInfo">
    <SSLGetInfoResult Status="active" Type="PositiveSSL" IsExpired="False"
                      Years="1" OrderId="1234" ProductCode="positivessl"
                      PurchasedAt="02/15/2024" ExpiredAt="02/15/2025"
                      HostName="example.com" Provider="Comodo" SANSCount="0" />
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011330` | Certificate ID not found |
| `2016330` | Certificate not associated with account |
| `4022330` | Failed to retrieve certificate info |
