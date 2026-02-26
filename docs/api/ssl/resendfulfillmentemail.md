## namecheap.ssl.resendfulfillmentemail

Resends the fulfillment email for an SSL certificate.

**Command:** `namecheap.ssl.resendfulfillmentemail`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `CertificateID` | Number | 20 | Yes | Certificate ID |

### Returns

| Name | Description |
|------|-------------|
| `ID` | Certificate ID |
| `IsSuccess` | `True`/`False` |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.ssl.resendfulfillmentemail</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.resendfulfillmentemail">
    <SSLResendFulfillmentEmailResult ID="123456" IsSuccess="true" />
  </CommandResponse>
</ApiResponse>
```
