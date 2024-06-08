# Address API Spec

### Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers:

- Autorization : token

Request Body :

```json
{
  "street": "test",
  "city": "test",
  "province": "test",
  "country": "test",
  "postal_code": "test"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "test",
    "city": "test",
    "province": "test",
    "country": "test",
    "postal_code": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers:

- Autorization : token

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "test",
    "city": "test",
    "province": "test",
    "country": "test",
    "postal_code": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers:

- Autorization : token

Request Body :

```json
{
  "street": "test",
  "city": "test",
  "province": "test",
  "country": "test",
  "postal_code": "test"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "test",
    "city": "test",
    "province": "test",
    "country": "test",
    "postal_code": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Delete Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers:

- Autorization : token

Response Body (Success) :

```json
{
  "data": true
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### List Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers:

- Autorization : token

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "test",
      "city": "test",
      "province": "test",
      "country": "test",
      "postal_code": "test"
    },
    {
      "id": 1,
      "street": "test",
      "city": "test",
      "province": "test",
      "country": "test",
      "postal_code": "test"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```
