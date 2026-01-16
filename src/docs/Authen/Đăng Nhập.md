# Đăng Nhập

## Description
Xác thực người dùng và trả về JWT token.

## Endpoint
`/api/auth/login`

## Method
`POST`

## Headers
- `Content-Type: application/json`
- `Accept: application/json`

## Request Body
| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `email` | string | Yes | Địa chỉ Email | Email hợp lệ |
| `password` | string | Yes | Mật khẩu | |

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

## Response Success
**Status Code:** 200 OK

```json
{
  "success": true,
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLChb... (JWT Token)",
    "user": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "role": "USER"
    }
  },
  "message": "Login successful."
}
```

## Response Error
**Status Code:** 422 Unprocessable Entity (Validation Error)

```json
{
  "message": "The email field is required.",
  "errors": {
    "email": [
      "The email field is required."
    ]
  }
}
```

**Status Code:** 401 Unauthorized

```json
{
  "success": false,
  "data": null,
  "message": "Invalid credentials."
}
```

## Curl Example
```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```
