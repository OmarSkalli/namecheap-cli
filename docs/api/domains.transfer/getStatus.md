## namecheap.domains.transfer.getStatus

Gets the status of a domain transfer.

**Command:** `namecheap.domains.transfer.getStatus`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `TransferID` | Number | 20 | Yes | Transfer ID (from `transfer.create` response) |

### Returns

| Name | Description |
|------|-------------|
| `TransferID` | Transfer ID |
| `StatusID` | Numeric status code |
| `Status` | Status description string |
| `Domain` | Domain name |
| `ChargedAmount` | Amount charged |

### Transfer Status IDs

| StatusID | Description |
|----------|-------------|
| 1 | Pending transfer request from previous registrar |
| 2 | Transfer approved by previous registrar |
| 3 | Transfer rejected by previous registrar |
| 4 | Transfer cancelled |
| 5 | Transfer completed |
| 6 | Transfer initiated |
| 7 | Waiting for approval from current owner |
| 8 | Contact update request sent |
| 9 | Transfer failed |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.transfer.getStatus
  &TransferID=123456
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.transfer.getStatus</RequestedCommand>
  <CommandResponse Type="namecheap.domains.transfer.getStatus">
    <TransferGetStatusResult TransferID="123456" StatusID="7"
                              Status="Waiting for transfer approval from the current owner"
                              Domain="example.com" ChargedAmount="8.88" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.123</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011288` | Transfer ID not found |
| `2016166` | Transfer not associated with your account |
