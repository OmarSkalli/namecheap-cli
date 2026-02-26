## namecheap.users.getPricing

Returns pricing information for a requested product type.

**Command:** `namecheap.users.getPricing`

> **Note:** Cache this API response to avoid repeated calls.

### Request Parameters

| Name | Type | Required? | Description |
|------|------|-----------|-------------|
| `ProductType` | String | Yes | Product type. Possible values: `DOMAIN`, `SSLCERTIFICATE`, `WHOISGUARD` |
| `ProductCategory` | String | No | Product category. For `DOMAIN`: `DOMAINS`. For `SSLCERTIFICATE`: `COMODO` |
| `PromotionCode` | String | No | Promotional (coupon) code |
| `ActionName` | String | No | Specific action. For `DOMAIN`: `REGISTER`, `RENEW`, `REACTIVATE`, `TRANSFER`. For `SSLCERTIFICATE`: `PURCHASE`, `RENEW` |
| `ProductName` | String | No | Name of the product. For `DOMAIN`: `COM`, `NET`, `ORG`, etc. For `SSLCERTIFICATE`: `INSTANTSSL`, etc. |

### Returns

| Name | Description |
|------|-------------|
| `ProductType Name` | Product type name |
| `ProductCategory Name` | Product category name |
| `Product Name` | Specific product name |
| `Duration` | Duration of the product |
| `DurationType` | Duration type (e.g., `YEAR`) |
| `Price` | Final price (lowest of: regular, user, special, promo, or tier price) |
| `RegularPrice` | Regular price |
| `YourPrice` | Price specific to this user |
| `CouponPrice` | Price after applying the promotion code |
| `Currency` | Currency (e.g., `USD`) |

### Example Request

```
GET https://api.namecheap.com/xml.response
  ?Command=namecheap.users.getPricing
  &ProductType=DOMAIN
  &[auth params]
```

### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ApiResponse xmlns="http://api.namecheap.com/xml.response" Status="OK">
  <Errors />
  <RequestedCommand>namecheap.users.getPricing</RequestedCommand>
  <CommandResponse Type="namecheap.users.getPricing">
    <UserGetPricingResult>
      <ProductType Name="DOMAIN">
        <ProductCategory Name="DOMAINS">
          <Product Name="COM">
            <Price Duration="1" DurationType="YEAR" Price="8.88"
                   RegularPrice="10.98" YourPrice="8.88"
                   CouponPrice="" Currency="USD" />
          </Product>
        </ProductCategory>
      </ProductType>
    </UserGetPricingResult>
  </CommandResponse>
  <Server>SERVER-NAME</Server>
  <GMTTimeDifference>+5:30</GMTTimeDifference>
  <ExecutionTime>1.340</ExecutionTime>
</ApiResponse>
```

### Error Codes

| Code | Description |
|------|-------------|
| `2011170` | PromotionCode is invalid |
| `2011298` | ProductType is invalid |
