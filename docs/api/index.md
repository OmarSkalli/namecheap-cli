# Namecheap API Reference

> **Base URL:** `https://api.namecheap.com/xml.response`
> **Sandbox URL:** `https://api.sandbox.namecheap.com/xml.response`
> **Format:** All responses are XML

## Authentication

Every request requires these parameters:

| Parameter | Description |
|-----------|-------------|
| `ApiUser` | Username of the user making the API call |
| `ApiKey`  | API key for the user |
| `UserName`| Username of the account for which the command is run |
| `ClientIp`| Whitelisted IP address of the client |
| `Command` | The API command to execute |

## namecheap.domains

| Method | Description |
|--------|-------------|
| [namecheap.domains.getList](./domains/getList.md) | Returns a list of domains for the particular user |
| [namecheap.domains.getContacts](./domains/getContacts.md) | Gets contact information for the requested domain |
| [namecheap.domains.create](./domains/create.md) | Registers a new domain name |
| [namecheap.domains.getTldList](./domains/getTldList.md) | Returns a list of available TLDs |
| [namecheap.domains.setContacts](./domains/setContacts.md) | Sets contact information for the requested domain |
| [namecheap.domains.check](./domains/check.md) | Checks the availability of one or more domains |
| [namecheap.domains.reactivate](./domains/reactivate.md) | Reactivates an expired domain |
| [namecheap.domains.renew](./domains/renew.md) | Renews an expiring domain |
| [namecheap.domains.getRegistrarLock](./domains/getRegistrarLock.md) | Gets the registrar lock status for the requested domain |
| [namecheap.domains.setRegistrarLock](./domains/setRegistrarLock.md) | Sets the registrar lock status for a domain |
| [namecheap.domains.getInfo](./domains/getInfo.md) | Returns information about the requested domain |

## namecheap.domains.dns

| Method | Description |
|--------|-------------|
| [namecheap.domains.dns.setDefault](./domains.dns/setDefault.md) | Sets a domain to use Namecheap's default DNS servers |
| [namecheap.domains.dns.setCustom](./domains.dns/setCustom.md) | Sets a domain to use custom DNS servers |
| [namecheap.domains.dns.getList](./domains.dns/getList.md) | Gets a list of DNS servers associated with the requested domain |
| [namecheap.domains.dns.getHosts](./domains.dns/getHosts.md) | Retrieves DNS host record information for the requested domain |
| [namecheap.domains.dns.getEmailForwarding](./domains.dns/getEmailForwarding.md) | Gets email forwarding settings for the requested domain |
| [namecheap.domains.dns.setEmailForwarding](./domains.dns/setEmailForwarding.md) | Sets email forwarding for the requested domain |
| [namecheap.domains.dns.setHosts](./domains.dns/setHosts.md) | Sets DNS host records for the requested domain (replaces all existing records) |

## namecheap.domains.ns

| Method | Description |
|--------|-------------|
| [namecheap.domains.ns.create](./domains.ns/create.md) | Creates a new nameserver for the domain |
| [namecheap.domains.ns.delete](./domains.ns/delete.md) | Deletes a nameserver associated with the requested domain |
| [namecheap.domains.ns.getInfo](./domains.ns/getInfo.md) | Retrieves information about a registered nameserver |
| [namecheap.domains.ns.update](./domains.ns/update.md) | Updates the IP address of a registered nameserver |

## namecheap.domains.transfer

| Method | Description |
|--------|-------------|
| [namecheap.domains.transfer.create](./domains.transfer/create.md) | Transfers a domain to Namecheap |
| [namecheap.domains.transfer.getStatus](./domains.transfer/getStatus.md) | Gets the status of a domain transfer |
| [namecheap.domains.transfer.updateStatus](./domains.transfer/updateStatus.md) | Updates the status of a domain transfer |
| [namecheap.domains.transfer.getList](./domains.transfer/getList.md) | Gets the list of domain transfers |

## namecheap.ssl

| Method | Description |
|--------|-------------|
| [namecheap.ssl.create](./ssl/create.md) | Creates a new SSL certificate by purchasing it |
| [namecheap.ssl.activate](./ssl/activate.md) | Activates a purchased and non-activated SSL certificate |
| [namecheap.ssl.getInfo](./ssl/getInfo.md) | Retrieves information about the requested SSL certificate |
| [namecheap.ssl.getList](./ssl/getList.md) | Returns a list of SSL certificates for the specified user |
| [namecheap.ssl.renew](./ssl/renew.md) | Renews an SSL certificate |
| [namecheap.ssl.reissue](./ssl/reissue.md) | Reissues an SSL certificate |
| [namecheap.ssl.resendfulfillmentemail](./ssl/resendfulfillmentemail.md) | Resends the fulfillment email for an SSL certificate |
| [namecheap.ssl.purchasemoresans](./ssl/purchasemoresans.md) | Purchases additional SANs for a multi-domain SSL certificate |
| [namecheap.ssl.revokecertificate](./ssl/revokecertificate.md) | Revokes a re-issued SSL certificate |
| [namecheap.ssl.toggleAutorenew](./ssl/toggleAutorenew.md) | Toggles the auto-renewal setting for an SSL certificate |
| [namecheap.ssl.getApproverEmailList](./ssl/getApproverEmailList.md) | Gets the list of approver email addresses for SSL DCV |
| [namecheap.ssl.resendApproverEmail](./ssl/resendApproverEmail.md) | Resends the approver email for DCV |
| [namecheap.ssl.editDCVMethod](./ssl/editDCVMethod.md) | Edits the DCV method for an SSL certificate |

## namecheap.users

| Method | Description |
|--------|-------------|
| [namecheap.users.getPricing](./users/getPricing.md) | Returns pricing information for a requested product type |
| [namecheap.users.getBalances](./users/getBalances.md) | Gets information about funds in the user's account |
| [namecheap.users.changePassword](./users/changePassword.md) | Changes the user's password |
| [namecheap.users.update](./users/update.md) | Updates user account information |
| [namecheap.users.createaddfundsrequest](./users/createaddfundsrequest.md) | Creates a request to add funds via credit card |
| [namecheap.users.getAddFundsStatus](./users/getAddFundsStatus.md) | Gets the status of an add funds request |
| [namecheap.users.create](./users/create.md) | Creates a new sub-account at Namecheap |
| [namecheap.users.login](./users/login.md) | Validates the username and password of user accounts |
| [namecheap.users.resetPassword](./users/resetPassword.md) | Sends a password reset link to the user's profile email address |

## namecheap.users.address

| Method | Description |
|--------|-------------|
| [namecheap.users.address.create](./users.address/create.md) | Creates a new address profile for the user |
| [namecheap.users.address.delete](./users.address/delete.md) | Deletes a specific address profile for the user |
| [namecheap.users.address.getInfo](./users.address/getInfo.md) | Gets information for the requested address ID |
| [namecheap.users.address.getList](./users.address/getList.md) | Gets a list of address IDs and names associated with the user account |
| [namecheap.users.address.setDefault](./users.address/setDefault.md) | Sets a specific address as the default address for the user |
| [namecheap.users.address.update](./users.address/update.md) | Updates a specific address profile for the user |

## namecheap.domainprivacy

| Method | Description |
|--------|-------------|
| [namecheap.domainprivacy.enable](./domainprivacy/enable.md) | Enables domain privacy protection for the specified WhoisguardID |
| [namecheap.domainprivacy.disable](./domainprivacy/disable.md) | Disables domain privacy protection for the specified WhoisguardID |
| [namecheap.domainprivacy.getList](./domainprivacy/getList.md) | Gets the list of domain privacy protection subscriptions |
| [namecheap.domainprivacy.renew](./domainprivacy/renew.md) | Renews domain privacy protection |
| [namecheap.domainprivacy.changeemailaddress](./domainprivacy/changeemailaddress.md) | Changes the domain privacy email address |

## Response Format

All API responses follow this XML structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK|ERROR">
  <Errors>
    <!-- Error elements if Status=ERROR -->
  </Errors>
  <Warnings />
  <RequestedCommand>namecheap.command.name</RequestedCommand>
  <CommandResponse Type="namecheap.command.name">
    <!-- Command-specific result data -->
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5</GMTTimeDifference>
  <ExecutionTime>0.123</ExecutionTime>
</ApiResponse>
```

## Rate Limits

- **Sandbox:** 20 requests/minute
- **Production:** Varies by account level

## Notes

- All requests must come from a whitelisted IP address
- The API only returns XML responses — no JSON support
- Some endpoints use separate `SLD` and `TLD` parameters (e.g., `example` and `com`) instead of the full domain name
