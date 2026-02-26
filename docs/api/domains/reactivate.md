## namecheap.domains.reactivate

Reactivates an expired domain.

**Command:** `namecheap.domains.reactivate`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Expired domain to reactivate |
| `YearsToAdd` | Number | 2 | No | Number of years after expiry |
| `PromotionCode` | String | 20 | No | Promotion code |
| `IsPremiumDomain` | Boolean | — | No | Set `true` for premium domains |
| `PremiumPrice` | Decimal | — | No | Required for premium domains |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Domain name |
| `IsSuccess` | `True`/`False` |
| `ChargedAmount` | Amount charged |
| `OrderID` | Order ID |
| `TransactionID` | Transaction ID |

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `3028166` | Domain is already active |
| `3050900` | Unknown error from Enom |
