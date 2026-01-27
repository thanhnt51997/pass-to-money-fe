# Đăng Ký

## Description
Đăng ký người dùng mới với email, tên và mật khẩu. Trả về JWT token khi thành công.

## Endpoint
`/api/auth/register`

## Method
`POST`

## Headers
- `Content-Type: application/json`
- `Accept: application/json`

## Request Body
| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `name` | string | Yes | Tên đầy đủ của người dùng | Max 255 ký tự |
| `email` | string | Yes | Địa chỉ Email | Email hợp lệ, Duy nhất |
| `password` | string | Yes | Mật khẩu | Tối thiểu 8 ký tự |

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

## Response Success
**Status Code:** 201 Created

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
  "message": "User registered successfully."
}
```

## Response Error
**Status Code:** 422 Unprocessable Entity (Validation Error)

```json
{
  "message": "The email has already been taken.",
  "errors": {
    "email": [
      "The email has already been taken."
    ]
  }
}
```

**Status Code:** 409 Conflict (Domain Error)

```json
{
  "success": false,
  "data": null,
  "message": "User with email john@example.com already exists."
}
```

## Curl Example
```bash
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```
