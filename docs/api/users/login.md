## namecheap.users.login

Validates the username and password of user accounts created via `users.create`.

**Command:** `namecheap.users.login`

> **Note:** The username is specified via the global `UserName` parameter.

### Request Parameters

| Name | Type | Required? | Description |
|------|------|-----------|-------------|
| `Password` | String | Yes | Password of the user account to validate |

### Returns

| Name | Description |
|------|-------------|
| `Username` | Username of the validated account |
| `LoginSuccess` | `true`/`false` — whether login succeeded |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.login</RequestedCommand>
  <CommandResponse Type="namecheap.users.login">
    <UserLoginResult UserName="user123" LoginSuccess="true" />
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011335` | Password parameter is missing |
| `2019166` | UserName is not available |
| `2010335` | Invalid password |
| `2017166` | User is disabled or locked |
| `2013410` | Too many declined payments |
| `2017289` | IP address is blocked |
| `5050900` | Unhandled exceptions |
