## namecheap.users.address.getList

Gets a list of address IDs and names associated with the user account.

**Command:** `namecheap.users.address.getList`

### Request Parameters

None (beyond standard auth parameters).

### Returns

A list of address entries:

| Name | Description |
|------|-------------|
| `AddressID` | Unique integer value representing the address profile |
| `AddressName` | Name of the address profile |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.address.getList</RequestedCommand>
  <CommandResponse Type="namecheap.users.address.getList">
    <AddressGetListResult>
      <List AddressId="49" AddressName="newaddress_test" />
    </AddressGetListResult>
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.047</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `4011331` | StatusCode is invalid |
