## namecheap.users.resetPassword

Sends a password reset link to the end user's profile email address.

**Command:** `namecheap.users.resetPassword`

> **Note:** The global `UserName` parameter should be **omitted** from this request.

### Request Parameters

| Name | Type | Required? | Description |
|------|------|-----------|-------------|
| `FindBy` | String | Yes | Method to find the user. Values: `EMAILADDRESS`, `DOMAINNAME`, `USERNAME` |
| `FindByValue` | String | Yes | The value to search by |
| `EmailFromName` | String | No | Display name for the sender. Default: `namecheap.com` |
| `EmailFrom` | String | No | Sender email. Default: `support@namecheap.com` |
| `URLPattern` | String | No | Custom URL pattern for the reset link |

### Returns

| Name | Description |
|------|-------------|
| `Success` | Whether reset email was sent |
| `Email` | Email address to which the reset link was sent |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.resetPassword</RequestedCommand>
  <CommandResponse Type="namecheap.users.resetPassword">
    <UserResetPasswordResult Success="true">
      <Email>contact@useremail.com</Email>
    </UserResetPasswordResult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011315` | FindBy parameter value is invalid |
| `4027153` | Failed to send email |
| `4022335` | Unable to reset password |
| `5050900` | Unhandled exceptions |
