## namecheap.domains.getRegistrarLock

Gets the registrar lock status for the requested domain.

**Command:** `namecheap.domains.getRegistrarLock`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Domain to check |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Domain name |
| `RegistrarLockStatus` | `True`/`False` — whether domain is locked |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.getRegistrarLock</RequestedCommand>
  <CommandResponse Type="namecheap.domains.getRegistrarLock">
    <DomainGetRegistrarLockResult Domain="example.com" RegistrarLockStatus="True" />
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain not associated with your account |
