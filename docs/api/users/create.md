## namecheap.users.create

Creates a new sub-account at Namecheap under this ApiUser.

**Command:** `namecheap.users.create`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `NewUserName` | String | — | Yes | Username for the new account |
| `NewUserPassword` | String | — | Yes | Password for the new account |
| `EmailAddress` | String | 128 | Yes | Email address |
| `IgnoreDuplicateEmailAddress` | String | — | No | Allow duplicate emails. Default: `Yes` |
| `FirstName` | String | — | Yes | First name |
| `LastName` | String | — | Yes | Last name |
| `AcceptTerms` | Number | — | Yes | Must be set to `1` |
| `AcceptNews` | Number | — | No | Marketing emails. Values: `0` or `1` |
| `JobTitle` | String | — | No | Job designation |
| `Organization` | String | — | No | Organization |
| `Address1` | String | — | Yes | Street address line 1 |
| `Address2` | String | — | No | Street address line 2 |
| `City` | String | — | Yes | City |
| `StateProvince` | String | — | Yes | State or Province |
| `Zip` | String | — | Yes | Zip/Postal code |
| `Country` | String | — | Yes | 2-letter country code |
| `Phone` | String | — | Yes | Phone in format `+NNN.NNNNNNNNNN` |
| `PhoneExt` | String | — | No | Phone extension |
| `Fax` | String | — | No | Fax number |

### Returns

| Name | Description |
|------|-------------|
| `Success` | Whether account was created |
| `UserId` | A unique integer representing the newly created user |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.create</RequestedCommand>
  <CommandResponse Type="namecheap.users.create">
    <UserCreateResult Success="true" UserId="75" />
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011153` | Email address is invalid |
| `2011163` | Phone is invalid |
| `2011165` | Fax is invalid |
| `2011103` | UserName is invalid |
| `2033153` | Email address already in use |
| `2015182` | Phone format must be `+NNN.NNNNNNNNNN` |
| `4022103` | Failed to create user |
