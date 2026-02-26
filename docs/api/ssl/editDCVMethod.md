## namecheap.ssl.editDCVMethod

Edits the DCV (Domain Control Validation) method for an SSL certificate.

**Command:** `namecheap.ssl.editDCVMethod`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `CertificateID` | Number | 20 | Yes | Certificate ID |
| `DCVMethod` | String | 10 | Yes | Validation method: `EMAIL`, `HTTP`, `DNS` |

### Returns

| Name | Description |
|------|-------------|
| `ID` | Certificate ID |
| `IsSuccess` | `True`/`False` |
| `HttpDCVFilePath` | HTTP validation file path (if `HTTP` method) |
| `DNSDCVHost` | DNS validation host (if `DNS` method) |
| `DNSDCVValue` | DNS validation value (if `DNS` method) |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.ssl.editDCVMethod</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.editDCVMethod">
    <SSLEditDCVMethodResult ID="123456" IsSuccess="true">
      <DNSDCVHost>_validationDNS.example.com</DNSDCVHost>
      <DNSDCVValue>random-validation-string</DNSDCVValue>
    </SSLEditDCVMethodResult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011330` | Certificate ID not found |
| `2016330` | Certificate not associated with account |
| `3028330` | Certificate is not in a state where DCV can be changed |
| `4022330` | Failed to update DCV method |
