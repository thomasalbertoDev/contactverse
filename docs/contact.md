# Contact API Spec

### Create Contact API

Endpoint : POST /api/contacts
Headers:

- Autorization : token

Request Body :

```json
{
  "first_name": "test",
  "last_name": "test",
  "email": "test",
  "phone": "test"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "test",
    "last_name": "test",
    "email": "test",
    "phone": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Get Contact API

Endpoint : GET /api/contacts/:contactId
Headers:

- Autorization : token

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "test",
    "last_name": "test",
    "email": "test",
    "phone": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Update Contact API

Endpoint : PUT /api/contacts/:contactId
Headers:

- Autorization : token

Request Body :

```json
{
  "first_name": "test",
  "last_name": "test",
  "email": "test",
  "phone": "test"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "test",
    "last_name": "test",
    "email": "test",
    "phone": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Delete Contact API

Endpoint : DELETE /api/contacts/:contactId
Headers:

- Autorization : token

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "test",
    "last_name": "test",
    "email": "test",
    "phone": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Search Contact API

Endpoint : GET /api/contacts
Headers:

- Autorization : token

Query Params :

- name: string (search first_name or last_name (optional))
- phone: string (optional)
- email: string (optional)
- page: number (default 1)
- size: number (default 10)

Request Body :

```json
{
  "first_name": "test",
  "last_name": "test",
  "email": "test",
  "phone": "test"
}
```

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "test",
      "last_name": "test",
      "email": "test",
      "phone": "test"
    },
    {
      "id": 1,
      "first_name": "test",
      "last_name": "test",
      "email": "test",
      "phone": "test"
    }
  ],
  "pagging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```
