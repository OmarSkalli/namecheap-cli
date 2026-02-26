## namecheap.users.address.delete

Deletes a specific address profile for the user.

**Command:** `namecheap.users.address.delete`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `AddressId` | Number | 20 | Yes | The unique AddressID to delete |

### Returns

| Name | Description |
|------|-------------|
| `Success` | Whether address was deleted |
| `ProfileID` | The unique ID of the deleted address profile |
| `Username` | The username whose address was deleted |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.address.delete</RequestedCommand>
  <CommandResponse Type="namecheap.users.address.delete">
    <AddressDeleteResult Success="true" ProfileId="48" UserName="apiuser" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.047</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `4011331` | StatusCode for delete is invalid |
| `4025336` | Failed to delete user's address |
