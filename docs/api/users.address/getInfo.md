## namecheap.users.address.getInfo

Gets information for the requested addressID.

**Command:** `namecheap.users.address.getInfo`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `AddressId` | Number | 20 | Yes | The unique AddressID to retrieve |

### Returns

| Name | Description |
|------|-------------|
| `AddressId` | Unique integer ID of the address |
| `UserName` | Username associated with the address |
| `AddressName` | Name label of the address profile |
| `Default_YN` | Whether this is the default address (`true`/`false`) |
| `FirstName` | First name |
| `LastName` | Last name |
| `JobTitle` | Job title |
| `Organization` | Organization |
| `Address1` | Street address line 1 |
| `Address2` | Street address line 2 |
| `City` | City |
| `StateProvince` | State or Province |
| `StateProvinceChoice` | State or Province choice |
| `Zip` | Zip/Postal code |
| `Country` | 2-letter country code |
| `Phone` | Phone number |
| `Fax` | Fax number |
| `PhoneExt` | Phone extension |
| `EmailAddress` | Email address |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.address.getInfo</RequestedCommand>
  <CommandResponse Type="namecheap.users.address.getInfo">
    <GetAddressInfoResult>
      <AddressId>49</AddressId>
      <UserName>apisample</UserName>
      <AddressName>newaddress_test</AddressName>
      <Default_YN>false</Default_YN>
      <FirstName>api</FirstName>
      <LastName>sample</LastName>
      <JobTitle>jtitle</JobTitle>
      <Organization>org_Test</Organization>
      <Address1>add1test</Address1>
      <Address2>add2test</Address2>
      <City>city_test</City>
      <StateProvince>state_test</StateProvince>
      <StateProvinceChoice>province_test</StateProvinceChoice>
      <Zip>641004</Zip>
      <Country>IN</Country>
      <Phone>91.1111111111</Phone>
      <Fax>91.11111111</Fax>
      <PhoneExt>23423</PhoneExt>
      <EmailAddress>contact@apisample.com</EmailAddress>
    </GetAddressInfoResult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `4011331` | StatusCode for getInfo is invalid |
| `4022336` | Failed to retrieve user's address |
