## namecheap.domains.getContacts

Gets contact information for the requested domain.

**Command:** `namecheap.domains.getContacts`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Domain to get contacts for |

### Returns

Top-level attributes on `DomainContactsResult`:

| Name | Description |
|------|-------------|
| `Domain` | Domain name |
| `DomainnameID` | Unique domain ID |

Returns contact info for `Registrant`, `Tech`, `Admin`, and `AuxBilling` contacts. Each contact block has a `Readonly` attribute (`True`/`False`) and contains:

| Name | Description |
|------|-------------|
| `FirstName` | First name |
| `LastName` | Last name |
| `Organization` | Organization name |
| `JobTitle` | Job title |
| `Address1` | Address line 1 |
| `Address2` | Address line 2 |
| `City` | City |
| `StateProvince` | State/province |
| `StateProvinceChoice` | `S` (state) or `P` (province) |
| `PostalCode` | Postal/ZIP code |
| `Country` | 2-letter country code |
| `Phone` | Phone in format `+1.5555555555` |
| `PhoneExt` | Phone extension |
| `Fax` | Fax number |
| `EmailAddress` | Email address |

Also returns a `CurrentAttributes` sub-element and optionally a `WhoisGuardContact` block with the same fields.

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.domains.getContacts
  &DomainName=example.com
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.getContacts</RequestedCommand>
  <CommandResponse Type="namecheap.domains.getContacts">
    <DomainContactsResult Domain="example.com" DomainnameID="57579">
      <Registrant ReadOnly="False">
        <FirstName>John</FirstName>
        <LastName>Doe</LastName>
        <Organization>Acme Corp</Organization>
        <Address1>123 Main St</Address1>
        <City>Anytown</City>
        <StateProvince>CA</StateProvince>
        <StateProvinceChoice>S</StateProvinceChoice>
        <PostalCode>12345</PostalCode>
        <Country>US</Country>
        <Phone>+1.5555551234</Phone>
        <EmailAddress>john@example.com</EmailAddress>
      </Registrant>
      <!-- Tech, Admin, AuxBilling contacts follow same structure -->
    </DomainContactsResult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain is not associated with your account |
| `2016167` | Domain is not associated with your user |
| `3031510` | Error from Enom |
| `3050900` | Unknown error from Enom |
| `4022337` | Failed to get contacts |
| `5050900` | Unhandled exception |
