## namecheap.ssl.toggleAutorenew

Toggles the auto-renewal setting for an SSL certificate.

**Command:** `namecheap.ssl.toggleAutorenew`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `CertificateID` | Number | 20 | Yes | Certificate ID |

### Returns

| Name | Description |
|------|-------------|
| `CertificateID` | Certificate ID |
| `AutoRenew` | `True`/`False` — new auto-renewal state |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.ssl.toggleAutorenew</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.toggleAutorenew">
    <SSLToggleAutorenewResult CertificateID="123456" AutoRenew="true" />
  </CommandResponse>
</ApiResponse>
```
