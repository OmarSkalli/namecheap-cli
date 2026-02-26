## namecheap.ssl.activate

Activates a purchased and non-activated SSL certificate.

**Command:** `namecheap.ssl.activate`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `CertificateID` | Number | 20 | Yes | Certificate ID from `ssl.create` |
| `CSR` | String | 5000 | Yes | Certificate Signing Request |
| `AdminEmailAddress` | String | 255 | Yes | Admin email address for approval |
| `WebServerType` | String | 50 | Yes | Web server type (e.g., `apacheopenssl`, `apachessl`, `iis4`, `iis5`, `iis`, `cpanel`, `other`) |
| `ApproverEmail` | String | 255 | Yes | Approver email for DCV (domain control validation) |
| `DNSDCVMethod` | — | — | No | Use DNS-based DCV instead of email |
| `HTTPDCVMethod` | — | — | No | Use HTTP-based DCV instead of email |
| `SANSDCVMethod` | — | — | No | DCV method for SAN domains |

### Returns

| Name | Description |
|------|-------------|
| `ID` | Certificate ID |
| `IsSuccess` | `True`/`False` |
| `HttpDCVFilePath` | File path for HTTP DCV validation |
| `DNSDCVHost` | DNS host for DNS DCV validation |
| `DNSDCVValue` | DNS value for DNS DCV validation |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.ssl.activate</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.activate">
    <SSLActivateResult ID="123456" IsSuccess="true">
      <HttpDCVFilePath>http://example.com/.well-known/pki-validation/file.txt</HttpDCVFilePath>
      <DNSDCVHost>_validationDNS.example.com</DNSDCVHost>
      <DNSDCVValue>random-validation-string</DNSDCVValue>
    </SSLActivateResult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011330` | Certificate ID not found |
| `2016330` | Certificate not associated with account |
| `3022330` | Failed to activate certificate |
| `4011337` | CSR is invalid |
