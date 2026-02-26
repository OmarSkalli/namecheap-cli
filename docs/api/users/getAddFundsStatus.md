## namecheap.users.getAddFundsStatus

Gets the status of an add funds request created via `users.createaddfundsrequest`.

**Command:** `namecheap.users.getAddFundsStatus`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `TokenId` | String | 100 | Yes | The TokenID returned by `createaddfundsrequest` |

### Returns

| Name | Description |
|------|-------------|
| `TransactionID` | Unique integer representing the transaction |
| `Amount` | Amount added to the account |
| `Status` | Status: `CREATED`, `SUBMITTED`, `COMPLETED`, `FAILED`, or `EXPIRED` |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.getAddFundsStatus</RequestedCommand>
  <CommandResponse Type="namecheap.users.getAddFundsStatus">
    <GetAddFundsStatusResult TransactionID="1233" Amount="40" Status="COMPLETED" />
  </CommandResponse>
  <Server>IMWS-A09</Server>
  <GMTTimeDifference>+5:30</GMTTimeDifference>
  <ExecutionTime>2.714</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2012342` | TokenID mismatch — does not belong to this user |
| `5050900` | Unknown exceptions |
