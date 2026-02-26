## namecheap.domains.transfer.updateStatus

Updates the status of a domain transfer (for resubmitting or cancelling).

**Command:** `namecheap.domains.transfer.updateStatus`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `TransferID` | Number | 20 | Yes | Transfer ID |
| `Resubmit` | String | 5 | Yes | `true` to resubmit the transfer |

### Returns

| Name | Description |
|------|-------------|
| `TransferID` | Transfer ID |
| `IsSuccess` | `True`/`False` |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.transfer.updateStatus</RequestedCommand>
  <CommandResponse Type="namecheap.domains.transfer.updateStatus">
    <TransferUpdateResult TransferID="123456" IsSuccess="true" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.456</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011288` | Transfer ID not found |
| `2016166` | Transfer not associated with your account |
| `3028288` | Transfer cannot be resubmitted in current state |
