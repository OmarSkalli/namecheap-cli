## namecheap.users.changePassword

Changes the user's password. Works in two ways:
1. Change using old password
2. Change using a reset code from `users.resetPassword`

**Command:** `namecheap.users.changePassword`

> **Note (Way 2):** When using `ResetCode`, the global `UserName` parameter must be **omitted** from the request.

### Request Parameters

| Name | Type | Required? | Description |
|------|------|-----------|-------------|
| `OldPassword` | String | Required for Way 1 | Current password |
| `NewPassword` | String | Yes | New password to set |
| `ResetCode` | String | Required for Way 2 | Reset code from `users.resetPassword`. Omit `UserName` when using this. |

### Returns

| Name | Description |
|------|-------------|
| `Success` | Whether password was changed successfully |
| `UserID` | A unique integer representing the user |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.changePassword</RequestedCommand>
  <CommandResponse Type="namecheap.users.changePassword">
    <UserChangePasswordResult Success="true" UserId="123" />
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2010302` | OldPassword is missing (Way 1) |
| `2015103` | Cannot change UserName and ResetCode at the same time |
| `2010303` | ResetCode is missing (Way 2) |
| `4011331` | StatusCode is invalid |
| `4022335` | Unable to change password |
| `5050900` | Unhandled exceptions |
