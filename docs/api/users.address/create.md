## namecheap.users.address.create

Creates a new address profile for the user.

**Command:** `namecheap.users.address.create`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `AddressName` | String | 20 | Yes | Name label for the address |
| `DefaultYN` | Number | 128 | No | Set as default address. Values: `0` or `1` |
| `EmailAddress` | String | 128 | Yes | Email address |
| `FirstName` | String | 60 | Yes | First name |
| `LastName` | String | 60 | Yes | Last name |
| `JobTitle` | String | 60 | No | Job designation |
| `Organization` | String | 60 | No | Organization |
| `Address1` | String | 60 | Yes | Street address line 1 |
| `Address2` | String | 60 | No | Street address line 2 |
| `City` | String | 60 | Yes | City |
| `StateProvince` | String | 60 | Yes | State or Province |
| `StateProvinceChoice` | String | 60 | Yes | State or Province choice |
| `Zip` | String | 15 | Yes | Zip/Postal code |
| `Country` | String | 2 | Yes | 2-letter country code |
| `Phone` | String | 20 | Yes | Phone in format `+NNN.NNNNNNNNNN` |
| `PhoneExt` | String | 10 | No | Phone extension |
| `Fax` | String | 20 | No | Fax number |

### Returns

| Name | Description |
|------|-------------|
| `Success` | Whether address was created |
| `AddressID` | Unique integer representing the address profile |
| `AddressName` | The name of the created address profile |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.users.address.create
  &AddressName=My+Home+Address
  &EmailAddress=john@example.com
  &FirstName=John
  &LastName=Doe
  &Address1=123+Main+St
  &City=Anytown
  &StateProvince=CA
  &StateProvinceChoice=S
  &Zip=12345
  &Country=US
  &Phone=+1.5555551234
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.address.create</RequestedCommand>
  <CommandResponse Type="namecheap.users.address.create">
    <AddressCreateResult Success="true" AddressId="48" AddressName="newaddress_test" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5:30</GMTTimeDifference>
  <ExecutionTime>0.047</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `4011331` | StatusCode for create is invalid |
| `4023336` | Failed to add user's address |
| `2015182` | Phone is invalid — format must be `+NNN.NNNNNNNNNN` |
