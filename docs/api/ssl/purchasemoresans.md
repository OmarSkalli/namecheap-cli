## namecheap.ssl.purchasemoresans

Purchases additional SANs (Subject Alternative Names) for a multi-domain SSL certificate.

**Command:** `namecheap.ssl.purchasemoresans`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `CertificateID` | Number | 20 | Yes | Certificate ID |
| `NumberOfSANSToAdd` | Number | 10 | Yes | Number of additional SANs to add |

### Returns

| Name | Description |
|------|-------------|
| `CertificateID` | Certificate ID |
| `IsSuccess` | `True`/`False` |
| `OrderId` | Order ID |
| `TransactionId` | Transaction ID |
| `ChargedAmount` | Amount charged |
