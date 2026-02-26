## namecheap.users.getBalances

Gets information about funds in the user's account.

**Command:** `namecheap.users.getBalances`

### Request Parameters

None (beyond standard auth parameters).

### Returns

| Name | Description |
|------|-------------|
| `Currency` | Currency of the account balances |
| `AvailableBalance` | Funds available to spend |
| `AccountBalance` | Total account balance |
| `EarnedAmount` | Amount earned (e.g., from referrals) |
| `WithdrawableAmount` | Amount that can be withdrawn |
| `FundsRequiredForAutoRenew` | Total amount required for auto-renewing domains expiring within 90 days |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.getBalances</RequestedCommand>
  <CommandResponse Type="namecheap.users.getBalances">
    <UserGetBalancesResult Currency="USD" AvailableBalance="4932.96"
                           AccountBalance="4932.96" EarnedAmount="381.70"
                           WithdrawableAmount="1243.36" FundsRequiredForAutoRenew="0.00" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5:30</GMTTimeDifference>
  <ExecutionTime>0.340</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `4022312` | Balance information is not available |
