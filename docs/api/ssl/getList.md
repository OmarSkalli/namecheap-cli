## namecheap.ssl.getList

Returns a list of SSL certificates for the specified user.

**Command:** `namecheap.ssl.getList`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `ListType` | String | 10 | No | `ALL`, `Processing`, `EmailSent`, `TechnicalProblem`, `InProgress`, `Completed`, `Deactivated`, `Active`, `Cancelled`, `NewPurchase`, `NewRenewal`. Default: `All` |
| `SearchTerm` | String | 70 | No | Keyword to filter |
| `Page` | Number | 10 | No | Page number. Default: `1` |
| `PageSize` | Number | 10 | No | Results per page (10-100). Default: `20` |
| `SortBy` | String | 20 | No | `PURCHASEDATE`, `PURCHASEDATE_DESC`, `SSLTYPE`, `SSLTYPE_DESC`, `EXPIREDATE`, `EXPIREDATE_DESC`, `Host_Name`, `Host_Name_DESC` |

### Returns

List of SSL certificate records with:

| Name | Description |
|------|-------------|
| `CertificateID` | Certificate ID |
| `HostName` | Hostname |
| `SSLType` | Certificate type |
| `PurchasedAt` | Purchase date |
| `ExpiredAt` | Expiration date |
| `IsExpired` | Whether expired |
| `Status` | Certificate status |
| `Years` | Years purchased |
| `SANSCount` | Number of SANs |

Also returns `Paging` with `TotalItems`, `CurrentPage`, `PageSize`.

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.ssl.getList</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.getList">
    <SSLListResult>
      <SSL CertificateID="123456" HostName="example.com" SSLType="PositiveSSL"
           PurchasedAt="02/15/2024" ExpiredAt="02/15/2025" IsExpired="false"
           Status="active" Years="1" SANSCount="0" />
    </SSLListResult>
    <Paging>
      <TotalItems>1</TotalItems>
      <CurrentPage>1</CurrentPage>
      <PageSize>20</PageSize>
    </Paging>
  </CommandResponse>
</ApiResponse>
```
