## namecheap.domains.getInfo

Returns information about the requested domain.

**Command:** `namecheap.domains.getInfo`

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `DomainName` | String | 70 | Yes | Domain to get info for |
| `HostName` | String | 255 | No | Hosted domain name for which domain information needs to be requested |

### Returns

| Name | Description |
|------|-------------|
| `DomainName` | Domain name |
| `OwnerName` | Owner username |
| `ID` | Domain ID |
| `IsOwner` | `True`/`False` |
| `IsPremium` | `True`/`False` |
| `Status` | Domain status (e.g., `Ok`) |
| **DomainDetails** | |
| `CreatedDate` | Creation date |
| `ExpiredDate` | Expiration date |
| `NumYears` | Number of years registered |
| **Whoisguard** | |
| `Enabled` | `True`/`False` — WhoisGuard enabled |
| `ID` | WhoisGuard ID |
| `ExpiredDate` | WhoisGuard expiration date |
| **PremiumDnsSubscription** | |
| `IsActive` | Whether premium DNS is active |
| **DnsDetails** | |
| `ProviderType` | `FREE`/`CUSTOM` |
| `IsUsingOurDNS` | `True`/`False` |
| `HostCount` | Number of host records |
| `EmailType` | Email forwarding type |
| `DynamicDNSStatus` | Dynamic DNS status |
| `Nameserver` | Nameserver(s) in use |
| **Modificationrights** | |
| `All` | `True`/`False` — full modification rights |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.getinfo</RequestedCommand>
  <CommandResponse Type="namecheap.domains.getinfo">
    <DomainGetInfoResult DomainName="example.com" OwnerName="testuser"
                         ID="57579" IsOwner="True" IsPremium="False" Status="Ok">
      <DomainDetails>
        <CreatedDate>02/15/2011</CreatedDate>
        <ExpiredDate>02/15/2025</ExpiredDate>
        <NumYears>0</NumYears>
      </DomainDetails>
      <LockDetails />
      <Whoisguard Enabled="True" ID="12345">
        <ExpiredDate>02/15/2025</ExpiredDate>
      </Whoisguard>
      <PremiumDnsSubscription>
        <UseAutoRenew>False</UseAutoRenew>
        <SubscriptionId>-1</SubscriptionId>
        <CreatedDate>1/1/0001</CreatedDate>
        <ExpirationDate>1/1/0001</ExpirationDate>
        <IsActive>False</IsActive>
      </PremiumDnsSubscription>
      <DnsDetails ProviderType="FREE" IsUsingOurDNS="True"
                  HostCount="2" EmailType="FWD" DynamicDNSStatus="False" IsFailover="False">
        <Nameserver>dns1.registrar-servers.com</Nameserver>
        <Nameserver>dns2.registrar-servers.com</Nameserver>
      </DnsDetails>
      <Modificationrights All="True" />
    </DomainGetInfoResult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain not associated with your account |
