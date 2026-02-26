## namecheap.domains.transfer.create

Transfers a domain to Namecheap.

**Command:** `namecheap.domains.transfer.create`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Domain to transfer |
| `Years` | Number | 2 | Yes | Number of years to add upon transfer (usually 1) |
| `EPPCode` | String | 255 | Yes | EPP/authorization code from current registrar |
| `PromotionCode` | String | 20 | No | Promotion/coupon code |
| `RegistrantFirstName` | String | 255 | Yes | Registrant first name |
| `RegistrantLastName` | String | 255 | Yes | Registrant last name |
| `RegistrantOrganizationName` | String | 255 | No | Registrant organization |
| `RegistrantAddress1` | String | 255 | Yes | Address line 1 |
| `RegistrantAddress2` | String | 255 | No | Address line 2 |
| `RegistrantCity` | String | 255 | Yes | City |
| `RegistrantStateProvince` | String | 255 | Yes | State/province |
| `RegistrantPostalCode` | String | 255 | Yes | Postal code |
| `RegistrantCountry` | String | 2 | Yes | 2-letter country code |
| `RegistrantPhone` | String | 50 | Yes | Phone (format: `+1.5555555555`) |
| `RegistrantEmailAddress` | String | 255 | Yes | Email address |
| `AddFreeWhoisguard` | String | 10 | No | `yes` to add free WhoisGuard |
| `WGEnabled` | String | 10 | No | `yes` to enable WhoisGuard immediately |

> **Note:** Tech, Admin, and AuxBilling contact fields follow the same pattern with their respective prefixes.

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Domain name |
| `TransferID` | Unique ID for this transfer |
| `StatusID` | Status code |
| `IsSuccess` | `True`/`False` |
| `ChargedAmount` | Amount charged |
| `OrderID` | Order ID |
| `TransactionID` | Transaction ID |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.transfer.create</RequestedCommand>
  <CommandResponse Type="namecheap.domains.transfer.create">
    <TransferCreateResult Domain="example.com" TransferID="123456"
                          StatusID="7" IsSuccess="true"
                          ChargedAmount="8.88" OrderID="1234" TransactionID="5678" />
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>1.789</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2010398` | Domain not available for transfer |
| `2030280` | TLD not supported |
| `3031288` | Transfer already in progress |
| `4022337` | Failed to initiate transfer |
