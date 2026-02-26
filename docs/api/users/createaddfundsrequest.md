## namecheap.users.createaddfundsrequest

Creates a request to add funds via credit card. This is a 3-step process:
1. Call this API to get a `TokenID` and `RedirectURL`
2. Redirect the user to `RedirectURL` to enter credit card details
3. After payment, the user is redirected to the `ReturnUrl` you specified

**Command:** `namecheap.users.createaddfundsrequest`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `Username` | String | — | Yes | Username of the account to add funds to |
| `PaymentType` | String | — | Yes | Payment type. Currently only `Creditcard` is supported |
| `Amount` | Number | — | Yes | Amount to add |
| `ReturnUrl` | String | 300 | Yes | URL to redirect the user after payment |

### Returns

| Name | Description |
|------|-------------|
| `TokenID` | Unique token representing this transaction (use with `getAddFundsStatus`) |
| `RedirectURL` | URL to redirect the user to enter credit card details |
| `ReturnURL` | The return URL (echoed back) |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.createaddfundsrequest</RequestedCommand>
  <CommandResponse Type="namecheap.users.createaddfundsrequest">
    <Createaddfundsrequestresult TokenID="3b54569a58e04ca6bde7db944d328cb4">
      <ReturnURL>https://example.com/return</ReturnURL>
      <RedirectURL>https://secure.namecheap.com/addfunds?token=3b54569a58e04ca6bde7db944d328cb4</RedirectURL>
    </Createaddfundsrequestresult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2030343` | PaymentType is not supported |
| `2019103` | Username not found |
| `2015312` | Minimum amount not met |
| `2013312` | Amount out of range |
| `2029341` | Credit card not approved |
| `5050900` | Unhandled exceptions |
