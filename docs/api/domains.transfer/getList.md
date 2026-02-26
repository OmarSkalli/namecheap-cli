## namecheap.domains.transfer.getList

Gets the list of domain transfers.

**Command:** `namecheap.domains.transfer.getList`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `ListType` | String | 10 | No | `ALL`, `INPROGRESS`, `CANCELLED`, `COMPLETED`. Default: `INPROGRESS` |
| `SearchTerm` | String | 70 | No | Keyword to filter transfers |
| `Page` | Number | 10 | No | Page number. Default: `1` |
| `PageSize` | Number | 10 | No | Results per page (10-100). Default: `10` |
| `SortBy` | String | 50 | No | `DOMAINNAME`, `DOMAINNAME_DESC`, `CREATEDATE`, `CREATEDATE_DESC`, `STATUSDATE`, `STATUSDATE_DESC` |

### Returns

List of transfer records with:

| Name | Description |
|------|-------------|
| `ID` | Transfer ID |
| `DomainName` | Domain name |
| `StatusID` | Status code |
| `Status` | Status description |
| `StatusDate` | Date of last status update |
| `OrderID` | Order ID |
| `User` | Username |

Also returns `Paging` with `TotalItems`, `CurrentPage`, `PageSize`.

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.transfer.getList</RequestedCommand>
  <CommandResponse Type="namecheap.domains.transfer.getList">
    <TransferGetListResult>
      <Transfer ID="123456" DomainName="example.com" StatusID="7"
                Status="Waiting for transfer approval from the current owner"
                StatusDate="02/15/2024" OrderID="1234" User="testuser" />
    </TransferGetListResult>
    <Paging>
      <TotalItems>1</TotalItems>
      <CurrentPage>1</CurrentPage>
      <PageSize>10</PageSize>
    </Paging>
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.234</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2016166` | Not authorized |
| `3028288` | Invalid list type |
