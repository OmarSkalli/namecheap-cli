## namecheap.domains.create

Registers a new domain name.

**Command:** `namecheap.domains.create`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Domain name to register |
| `Years` | Number | 2 | Yes | Number of years to register. Default: `2` |
| `PromotionCode` | String | 20 | No | Promotion/coupon code |
| `RegistrantFirstName` | String | 255 | Yes | Registrant first name |
| `RegistrantLastName` | String | 255 | Yes | Registrant last name |
| `RegistrantOrganizationName` | String | 255 | No | Registrant organization |
| `RegistrantJobTitle` | String | 255 | No | Job title |
| `RegistrantAddress1` | String | 255 | Yes | Address line 1 |
| `RegistrantAddress2` | String | 255 | No | Address line 2 |
| `RegistrantCity` | String | 255 | Yes | City |
| `RegistrantStateProvince` | String | 255 | Yes | State/province |
| `RegistrantStateProvinceChoice` | String | 1 | No | `S` or `P` |
| `RegistrantPostalCode` | String | 255 | Yes | Postal code |
| `RegistrantCountry` | String | 2 | Yes | 2-letter country code |
| `RegistrantPhone` | String | 50 | Yes | Phone in format `+1.5555555555` |
| `RegistrantPhoneExt` | String | 10 | No | Phone extension |
| `RegistrantFax` | String | 50 | No | Fax number |
| `RegistrantEmailAddress` | String | 255 | Yes | Email address |
| `TechFirstName` | String | 255 | Yes | Tech contact first name |
| `TechLastName` | String | 255 | Yes | Tech contact last name |
| ... | ... | ... | ... | Same fields for Tech, Admin, AuxBilling contacts |
| `BillingFirstName` | String | 255 | Yes | Billing contact first name |
| `BillingLastName` | String | 255 | Yes | Billing contact last name |
| `BillingOrganizationName` | String | 255 | No | Billing organization |
| `BillingJobTitle` | String | 255 | No | Billing job title |
| `BillingAddress1` | String | 255 | Yes | Billing address line 1 |
| `BillingAddress2` | String | 255 | No | Billing address line 2 |
| `BillingCity` | String | 255 | Yes | Billing city |
| `BillingStateProvince` | String | 255 | Yes | Billing state/province |
| `BillingStateProvinceChoice` | String | 1 | No | `S` or `P` |
| `BillingPostalCode` | String | 255 | Yes | Billing postal code |
| `BillingCountry` | String | 2 | Yes | Billing 2-letter country code |
| `BillingPhone` | String | 50 | Yes | Billing phone |
| `BillingPhoneExt` | String | 10 | No | Billing phone extension |
| `BillingFax` | String | 50 | No | Billing fax number |
| `BillingEmailAddress` | String | 255 | Yes | Billing email address |
| `Nameservers` | String | 1000 | No | Comma-separated nameservers (uses Namecheap DNS if omitted) |
| `AddFreeWhoisguard` | String | 10 | No | `yes` to add free WhoisGuard |
| `WGEnabled` | String | 10 | No | `yes` to enable WhoisGuard immediately |
| `IsPremiumDomain` | Boolean | — | No | Set `true` for premium domains |
| `PremiumPrice` | Decimal | — | No | Required for premium domains |
| `EapFee` | Decimal | — | No | Required during EAP period |
| `IdnCode` | String | 10 | No | Language code for IDN domains (e.g., `afr`, `alb`, `ara`, `chi`, `eus`, `cat`, `hrv`, `cze`, `dan`, `eng`, `est`, `fin`, `fra`, `glg`, `ger`, `hun`, `isl`, `ita`, `jpn`, `kor`, `lav`, `lit`, `mal`, `mlt`, `nep`, `nor`, `pol`, `por`, `pus`, `ron`, `rus`, `srp`, `slk`, `slv`, `spa`, `swe`, `tel`, `tha`, `tur`, `ukr`, `vie`) |

> **Note:** Tech, Admin, and AuxBilling contacts have the same fields as Registrant, prefixed with `Tech`, `Admin`, or `AuxBilling`. We recommend using HTTP POST for this command due to the large number of parameters.

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Registered domain name |
| `Registered` | `True`/`False` — registration success |
| `ChargedAmount` | Amount charged for registration |
| `DomainID` | Unique ID for the domain |
| `OrderID` | Order ID |
| `TransactionID` | Transaction ID |
| `WhoisguardEnable` | Whether WhoisGuard was enabled |
| `NonRealTimeDomain` | Whether domain registers in real time |

### Error Codes

| Code | Description |
|------|-------------|
| `2010398` | Domain not available |
| `2030280` | TLD is not supported |
| `2515610` | Invalid IDN code |
| `2515611` | IDN code not supported for this TLD |
| `2528268` | Order validation error |
| `3028166` | Domain already exists |
| `3031288` | A transfer is already in progress |
| `4022337` | Failed to register domain |
| `5050900` | Unhandled exception |
