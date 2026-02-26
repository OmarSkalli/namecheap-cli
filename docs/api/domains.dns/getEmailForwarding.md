## namecheap.domains.dns.getEmailForwarding

Gets email forwarding settings for the requested domain.

**Command:** `namecheap.domains.dns.getEmailForwarding`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Full domain name |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Domain name |
| `Mailbox` | Email alias (e.g., `info`) |
| `ForwardTo` | Destination email address |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.dns.getEmailForwarding</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.getEmailForwarding">
    <DomainDNSGetEmailForwardingResult Domain="example.com">
      <Forward mailbox="info" ForwardTo="user@gmail.com" />
    </DomainDNSGetEmailForwardingResult>
  </CommandResponse>
</ApiResponse>
```
