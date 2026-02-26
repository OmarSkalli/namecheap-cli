## namecheap.ssl.resendApproverEmail

Resends the approver email for DCV.

**Command:** `namecheap.ssl.resendApproverEmail`

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
  <RequestedCommand>namecheap.ssl.resendApproverEmail</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.resendApproverEmail">
    <SSLResendApproverEmailResult ID="123456" IsSuccess="true" />
  </CommandResponse>
</ApiResponse>
```
