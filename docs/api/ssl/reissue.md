## namecheap.ssl.reissue

Reissues an SSL certificate.

**Command:** `namecheap.ssl.reissue`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `CertificateID` | Number | 20 | Yes | Certificate ID to reissue |
| `CSR` | String | 5000 | Yes | New Certificate Signing Request |
| `WebServerType` | String | 50 | Yes | Web server type |
| `ApproverEmail` | String | 255 | No | Approver email for DCV |
| `HTTPDCVMethod` | — | — | No | Use HTTP DCV |
| `DNSDCVMethod` | — | — | No | Use DNS DCV |

### Returns

| Name | Description |
|------|-------------|
| `ID` | Certificate ID |
| `IsSuccess` | `True`/`False` |
| `HttpDCVFilePath` | HTTP validation file path |
| `DNSDCVHost` | DNS validation host |
| `DNSDCVValue` | DNS validation value |

### Error Codes

| Code | Description |
|------|-------------|
| `2011330` | Certificate ID not found |
| `4011337` | CSR is invalid |
| `3022330` | Failed to reissue |
