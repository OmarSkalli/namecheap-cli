## namecheap.domains.getList

Returns a list of domains for the particular user.

**Command:** `namecheap.domains.getList`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `ListType` | String | 10 | No | Possible values: `ALL`, `EXPIRING`, `EXPIRED`. Default: `ALL` |
| `SearchTerm` | String | 70 | No | Keyword to look for in the domain list |
| `Page` | Number | 10 | No | Page to return. Default: `1` |
| `PageSize` | Number | 10 | No | Number of domains per page. Min: 10, Max: 100. Default: `20` |
| `SortBy` | String | 50 | No | Possible values: `NAME`, `NAME_DESC`, `EXPIREDATE`, `EXPIREDATE_DESC`, `CREATEDATE`, `CREATEDATE_DESC` |

### Returns

| Name | Description |
|------|-------------|
| `ID` | Unique integer value that represents the domain |
| `Name` | Registered domain name |
| `User` | User account under which the domain is registered |
| `Created` | Domain creation date |
| `Expires` | Domain expiration date |
| `IsExpired` | `True`/`False` — whether the domain is expired |
| `IsLocked` | `True`/`False` — whether the domain is locked |
| `AutoRenew` | `True`/`False` — whether auto-renewal is enabled |
| `WhoisGuard` | `ENABLED`/`NOTPRESENT` — WhoisGuard status |
| `IsPremium` | `True`/`False` — whether it's a premium domain |
| `IsOurDNS` | `True`/`False` — whether Namecheap DNS is being used |

Also returns a `Paging` element with `TotalItems`, `CurrentPage`, and `PageSize`.

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?ApiUser=YOUR_USERNAME
  &ApiKey=YOUR_API_KEY
  &UserName=YOUR_USERNAME
  &ClientIp=YOUR_IP
  &Command=namecheap.domains.getList
  &ListType=ALL
  &Page=1
  &PageSize=20
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.getList</RequestedCommand>
  <CommandResponse Type="namecheap.domains.getList">
    <DomainGetListResult>
      <Domain ID="57579" Name="example.com" User="testuser"
              Created="02/15/2011" Expires="02/15/2025"
              IsExpired="False" IsLocked="False" AutoRenew="False"
              WhoisGuard="ENABLED" IsPremium="False" IsOurDNS="True" />
    </DomainGetListResult>
    <Paging>
      <TotalItems>1</TotalItems>
      <CurrentPage>1</CurrentPage>
      <PageSize>20</PageSize>
    </Paging>
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.012</ExecutionTime>
</ApiResponse>
```
