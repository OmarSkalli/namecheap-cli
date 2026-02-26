## namecheap.users.address.setDefault

Sets a specific address as the default address for the user.

**Command:** `namecheap.users.address.setDefault`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `AddressId` | Number | 20 | Yes | The unique AddressID to set as default |

### Returns

| Name | Description |
|------|-------------|
| `Success` | Whether default address was set |
| `AddressID` | The unique ID of the address now set as default |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.address.setDefault</RequestedCommand>
  <CommandResponse Type="namecheap.users.address.setDefault">
    <AddressSetDefaultResult Success="true" AddressId="49" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.047</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `4023336` | Failed to set default user's address |
