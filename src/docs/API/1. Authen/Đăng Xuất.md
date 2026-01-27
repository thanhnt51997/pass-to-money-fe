# Đăng Xuất

## Description
Huỷ token hiện tại, làm cho nó không còn hợp lệ.

## Endpoint
`/api/auth/logout`

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
  "data": null,
  "message": "Logged out successfully."
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
curl -X POST http://localhost/api/auth/logout \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json"
```
