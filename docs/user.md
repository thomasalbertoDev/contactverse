# User API Spec

### Register User API

Endpoint POST : /api/users

Request Body :

```json
{
  "username": "test",
  "password": "test",
  "name": "test"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "test",
    "name": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Login User API

Endpoint POST : /api/users/login

Request Body :

```json
{
  "username": "test",
  "password": "test",
  "name": "test"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "test",
    "name": "test",
    "token": "Generate Token"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Get User API

Endpoint GET : /api/users/current

Headers:

- Authorization : token

Response Body (Success) :

```json
{
  "data": {
    "username": "test",
    "name": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Update User API

Endpoint PATCH : /api/users/current

Headers:

- Authorization : token

Request Body :

```json
{
  "password": "test", // optional
  "name": "test" // optional
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "test",
    "name": "test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "message error"
}
```

### Logout User API

Endpoint PATCH : /api/users/current

Headers:

- Authorization : token

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
