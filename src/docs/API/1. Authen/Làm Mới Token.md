# Làm Mới Token

## Description
Cấp lại JWT token mới cho người dùng. Token cũ sẽ bị vô hiệu hoá.

## Endpoint
`/api/auth/refresh`

## Method
`POST`

## Headers
- `Authorization: Bearer <token>`
- `Content-Type: application/json`
- `Accept: application/json`

## Request Body
None

## Response Success
**Status Code:** 200 OK

```json
{
  "success": true,
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLChb... (New JWT Token)"
  },
  "message": "Token refreshed successfully."
}
```

## Response Error
**Status Code:** 401 Unauthorized

```json
{
  "success": false,
  "data": null,
  "message": "Unauthenticated."
}
```

## Curl Example
```bash
curl -X POST http://localhost/api/auth/refresh \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json"
```
