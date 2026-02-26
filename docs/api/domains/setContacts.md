## namecheap.domains.setContacts

Sets contact information for the requested domain.

**Command:** `namecheap.domains.setContacts`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Domain to update |
| `RegistrantFirstName` | String | 255 | Yes | Registrant first name |
| `RegistrantLastName` | String | 255 | Yes | Registrant last name |
| ... | ... | ... | ... | All registrant, tech, admin, auxbilling contact fields (same as `domains.create`) |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Domain name |
| `IsSuccess` | `True`/`False` — whether contacts were updated |

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain not associated with your account |
| `3050900` | Unknown error from Enom |
