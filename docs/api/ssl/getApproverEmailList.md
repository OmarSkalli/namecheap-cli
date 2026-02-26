## namecheap.ssl.getApproverEmailList

Gets the list of approver email addresses for a domain to be used with SSL DCV.

**Command:** `namecheap.ssl.getApproverEmailList`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Domain name |
| `CertificateType` | String | 50 | Yes | Certificate type |

### Returns

A list of valid approver email addresses for domain control validation.

| Name | Description |
|------|-------------|
| `EmailAddress` | Valid approver email address |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.ssl.getApproverEmailList</RequestedCommand>
  <CommandResponse Type="namecheap.ssl.getApproverEmailList">
    <GetApproverEmailListResult>
      <WhoisEmail>
        <EmailAddress>admin@example.com</EmailAddress>
        <EmailAddress>hostmaster@example.com</EmailAddress>
        <EmailAddress>postmaster@example.com</EmailAddress>
        <EmailAddress>webmaster@example.com</EmailAddress>
        <EmailAddress>administrator@example.com</EmailAddress>
      </WhoisEmail>
    </GetApproverEmailListResult>
  </CommandResponse>
</ApiResponse>
```
