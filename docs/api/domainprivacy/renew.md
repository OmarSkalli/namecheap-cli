## namecheap.whoisguard.renew

Renews domain privacy protection.

**Command:** `namecheap.whoisguard.renew`

> **Note:** Renewal is not permitted until within 30 days of expiration.

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `WhoisguardID` | String | 10 | Yes | The domain privacy ID to renew |
| `Years` | Number | 9 | Yes | Number of years to renew. Default: `1` |
| `PromotionCode` | Number | 20 | No | Promotional code |

### Returns

| Name | Description |
|------|-------------|
| `WhoisguardId` | The unique ID of the domain privacy subscription |
| `Years` | Number of years renewed |
| `Renew` | `true`/`false` — renewal status |
| `OrderId` | A unique integer representing the order |
| `TransactionId` | A unique integer representing the transaction |
| `ChargedAmount` | Amount charged for renewal |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.whoisguard.renew</RequestedCommand>
  <CommandResponse Type="namecheap.whoisguard.renew">
    <WhoisguardRenewResult WhoisguardId="38495" Years="1" Renew="true"
                            OrderId="580938" TransactionId="884255" ChargedAmount="6.8000" />
  </CommandResponse>
  <Server>API01</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.029</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011167` | Number of years should be max of 9 |
| `2029331` | Domain privacy is not allowed to renew before 30 days of its expiration |
| `2528268` | Order creation failed / validation error |
| `5050900` | Unhandled exception |
