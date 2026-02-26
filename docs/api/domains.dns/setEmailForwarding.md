## namecheap.domains.dns.setEmailForwarding

Sets email forwarding for the requested domain.

**Command:** `namecheap.domains.dns.setEmailForwarding`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Full domain name |
| `MailBox1` | String | 200 | Yes | First email alias (e.g., `info`) |
| `ForwardTo1` | String | 200 | Yes | First forward-to address |
| `MailBox2` | String | 200 | No | Second alias |
| `ForwardTo2` | String | 200 | No | Second forward-to address |
| ... | ... | ... | ... | Up to 100 forwarding entries (`MailBoxN`/`ForwardToN`) |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Domain name |
| `IsSuccess` | `True`/`False` — whether forwarding was updated |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.dns.setEmailForwarding</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.setEmailForwarding">
    <DomainDNSSetEmailForwardingResult Domain="example.com" IsSuccess="true" />
  </CommandResponse>
</ApiResponse>
```
