# Thông Tin Người Dùng

## Description
Lấy thông tin chi tiết của người dùng đang đăng nhập dựa trên JWT token.

## Endpoint
`/api/auth/me`

## Method
`GET`

## Headers
- `Authorization: Bearer <token>`
- `Accept: application/json`

## Request Body
None

## Response Success
**Status Code:** 200 OK

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  "message": "User information retrieved successfully."
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

**Status Code:** 404 Not Found

```json
{
  "success": false,
  "data": null,
  "message": "User not found."
}
```

## Curl Example
```bash
curl -X GET http://localhost/api/auth/me \
  -H "Authorization: Bearer <your_token>" \
  -H "Accept: application/json"
```
