## namecheap.ssl.revokecertificate

Revokes a re-issued SSL certificate.

**Command:** `namecheap.ssl.revokecertificate`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `CertificateID` | Number | 20 | Yes | Certificate ID to revoke |
| `CertificateType` | String | 50 | Yes | Certificate type |

### Returns

| Name | Description |
|------|-------------|
| `ID` | Certificate ID |
| `IsSuccess` | `True`/`False` |

### Error Codes

| Code | Description |
|------|-------------|
| `2011330` | Certificate ID not found |
| `2016330` | Certificate not associated with account |
| `3022330` | Failed to revoke |
