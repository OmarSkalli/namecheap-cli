## namecheap.domains.getTldList

Returns a list of available TLDs.

**Command:** `namecheap.domains.getTldList`

### Request Parameters

None (beyond standard auth parameters).

> **Note:** Results are cached for 30 minutes. Namecheap suggests calling this method only once per session.

### Returns

Returns a list of TLD objects with properties including:

| Name | Description |
|------|-------------|
| `Name` | TLD name (e.g., `com`, `net`) |
| `NonRealTime` | `True`/`False` — whether registration is real-time |
| `MinRegisterYears` | Minimum registration period in years |
| `MaxRegisterYears` | Maximum registration period in years |
| `MinRenewYears` | Minimum renewal period |
| `MaxRenewYears` | Maximum renewal period |
| `MinTransferYears` | Minimum transfer period |
| `MaxTransferYears` | Maximum transfer period |
| `YearsInLockPeriod` | Years in lock period |
| `SearchGroup` | Category group name |
| `SubType` | Subtype of TLD |
| `Type` | TLD type (e.g., `GTLD`, `CCTLD`) |
| `Category` | TLD category label |
| `SequenceNumber` | Display sequence number |
| `IsApiRegisterable` | `True`/`False` — can register via API |
| `IsApiRenewable` | `True`/`False` — can renew via API |
| `IsApiTransferable` | `True`/`False` — can transfer via API |
| `IsEppRequired` | `True`/`False` — EPP code required for transfer |
| `IsDisableModContact` | `True`/`False` — contact modification disabled |
| `IsDisableWGAllot` | `True`/`False` — WhoisGuard not available |
| `IsIncludeInExtendedSearchOnly` | `True`/`False` — only appears in extended search |
| `IsSupportsIDN` | `True`/`False` — supports Internationalized Domain Names |

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.domains.getTldList</RequestedCommand>
  <CommandResponse Type="namecheap.domains.getTldList">
    <Tlds>
      <Tld Name="com" NonRealTime="False" MinRegisterYears="1" MaxRegisterYears="10"
           MinRenewYears="1" MaxRenewYears="10" MinTransferYears="1" MaxTransferYears="10"
           YearsInLockPeriod="0" SearchGroup="Popular" SubType="" Type="GTLD"
           Category="Popular" SequenceNumber="10"
           IsApiRegisterable="True" IsApiRenewable="True" IsApiTransferable="True"
           IsEppRequired="True" IsDisableModContact="False" IsDisableWGAllot="False"
           IsIncludeInExtendedSearchOnly="False" IsSupportsIDN="True" />
      <!-- More TLDs... -->
    </Tlds>
  </CommandResponse>
</ApiResponse>
```
