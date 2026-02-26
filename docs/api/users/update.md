## namecheap.users.update

Updates user account information.

**Command:** `namecheap.users.update`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `FirstName` | String | — | Yes | First name |
| `LastName` | String | — | Yes | Last name |
| `JobTitle` | String | — | No | Job designation |
| `Organization` | String | — | No | Organization |
| `Address1` | String | — | Yes | Street address line 1 |
| `Address2` | String | — | No | Street address line 2 |
| `City` | String | — | Yes | City |
| `StateProvince` | String | — | Yes | State or Province |
| `Zip` | String | — | Yes | Zip/Postal code |
| `Country` | String | — | Yes | 2-letter country code |
| `EmailAddress` | String | 255 | Yes | Email address |
| `Phone` | String | — | Yes | Phone in format `+NNN.NNNNNNNNNN` |
| `PhoneExt` | String | — | No | Phone extension |
| `Fax` | String | — | No | Fax number |

### Returns

| Name | Description |
|------|-------------|
| `Success` | Whether update succeeded |
| `UserID` | A unique integer representing the user |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.update</RequestedCommand>
  <CommandResponse Type="namecheap.users.update">
    <UserUpdateResult Success="true" UserId="123" />
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `4011331` | StatusCode for update is invalid |
| `4024103` | Failed to update user |
| `2015182` | Phone is invalid — format must be `+NNN.NNNNNNNNNN` |
