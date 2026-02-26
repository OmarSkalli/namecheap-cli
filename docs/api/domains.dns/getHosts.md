## namecheap.domains.dns.getHosts

Retrieves DNS host record information for the requested domain.

**Command:** `namecheap.domains.dns.getHosts`

> **Note:** This method only works when the domain is using Namecheap's FreeDNS (default nameservers).

### Request Parameters

| Name | Type | MaxLength | Required? | Description |
|------|------|-----------|-----------|-------------|
| `SLD` | String | 70 | Yes | Second-level domain |
| `TLD` | String | 10 | Yes | Top-level domain |

### Returns

| Name | Description |
|------|-------------|
| `Domain` | Full domain name |
| `IsUsingOurDNS` | Whether Namecheap DNS is being used |
| **Host record fields:** | |
| `HostId` | Unique ID for the host record |
| `Name` | Hostname (e.g., `@`, `www`, `mail`) |
| `Type` | Record type: `A`, `AAAA`, `CNAME`, `MX`, `MXE`, `TXT`, `URL`, `URL301`, `FRAME` |
| `Address` | Value of the record |
| `MXPref` | MX preference value (for MX records) |
| `TTL` | Time-to-live in seconds (`1800` = Automatic) |
| `AssociatedAppTitle` | Associated application (if any) |
| `FriendlyName` | Friendly display name |
| `IsActive` | Whether the record is active |
| `IsDDNSEnabled` | Whether dynamic DNS is enabled |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.dns.getHosts</RequestedCommand>
  <CommandResponse Type="namecheap.domains.dns.getHosts">
    <DomainDNSGetHostsResult Domain="example.com" IsUsingOurDNS="true">
      <host HostId="12345" Name="@" Type="A" Address="1.2.3.4"
            MXPref="10" TTL="1800" AssociatedAppTitle="" FriendlyName=""
            IsActive="true" IsDDNSEnabled="false" />
      <host HostId="12346" Name="www" Type="CNAME" Address="example.com."
            MXPref="10" TTL="1800" AssociatedAppTitle="" FriendlyName=""
            IsActive="true" IsDDNSEnabled="false" />
    </DomainDNSGetHostsResult>
  </CommandResponse>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2019166` | Domain not found |
| `2016166` | Domain is not associated with your account |
| `2030166` | Edit permission not supported (domain uses custom DNS) |
