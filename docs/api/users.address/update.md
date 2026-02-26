## namecheap.users.address.update

Updates a specific address profile for the user.

**Command:** `namecheap.users.address.update`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `AddressId` | Number | 20 | Yes | The unique address ID to update |
| `AddressName` | String | 20 | Yes | New name label for the address |
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
| `Success` | Whether address was updated |
| `AddressID` | The unique ID of the updated address profile |
| `AddressName` | The updated name of the address profile |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.address.update</RequestedCommand>
  <CommandResponse Type="namecheap.users.address.update">
    <AddressUpdateResult Success="true" AddressId="48" AddressName="address_test" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.047</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `4011331` | StatusCode for update is invalid |
| `4024336` | Failed to update user's address |
| `2015182` | Phone is invalid — format must be `+NNN.NNNNNNNNNN` |
