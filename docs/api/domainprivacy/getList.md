## namecheap.whoisguard.getList

Gets the list of domain privacy protection subscriptions.

**Command:** `namecheap.whoisguard.getList`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `ListType` | String | 10 | No | Filter results. Values: `ALL`, `ALLOTED`, `FREE`, `DISCARD`. Default: `ALL` |
| `Page` | Number | 10 | No | Page number. Default: `1` |
| `PageSize` | Number | 20 | No | Results per page. Min: `2`, Max: `100` |

### Returns

A list of WhoisGuard subscriptions:

| Name | Description |
|------|-------------|
| `ID` | Unique integer representing the domain privacy subscription |
| `Domainname` | Domain name associated with the subscription (empty if not assigned) |
| `Created` | Creation date |
| `Expires` | Expiration date |
| `Status` | Current status: `unused`, `enabled`, `disabled` |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.whoisguard.getList
  &ListType=ALL
  &Page=1
  &PageSize=20
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <Warnings />
  <RequestedCommand>namecheap.whoisguard.getList</RequestedCommand>
  <CommandResponse Type="namecheap.whoisguard.getList">
    <WhoisguardGetListResult>
      <Whoisguard ID="38495" DomainName="" Created="05/13/2014" Expires="" Status="unused" />
      <Whoisguard ID="34301" DomainName="" Created="12/18/2013" Expires="12/18/2014" Status="unused" />
      <Whoisguard ID="34400" DomainName="example.com" Created="12/26/2013" Expires="12/26/2024" Status="enabled" />
    </WhoisguardGetListResult>
  </CommandResponse>
  <Server>API02</Server>
  <GMTTimeDifference>--5:00</GMTTimeDifference>
  <ExecutionTime>0.92</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011272` | ListType is not valid |
