## namecheap.domains.setRegistrarLock

Sets the registrar lock status for a domain.

**Command:** `namecheap.domains.setRegistrarLock`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Domain to lock/unlock |
| `LockAction` | String | 10 | No | `LOCK` to lock, `UNLOCK` to unlock. Default: `LOCK` |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Domain name |
| `IsSuccess` | `True`/`False` |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.setRegistrarLock</RequestedCommand>
  <CommandResponse Type="namecheap.domains.setRegistrarLock">
    <DomainSetRegistrarLockResult Domain="example.com" IsSuccess="True" />
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain not associated with your account |
| `3031510` | Error from Enom |
