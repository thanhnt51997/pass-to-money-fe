Triển khai API "Start Interview Session".

API SPEC:
- Method: POST
- Endpoint: /api/interviews/{id}/start
- Auth: Required

BUSINESS RULE:
- Chỉ cho phép start nếu trạng thái là pending
- Khi start:
    - status → in_progress
    - started_at = now()
- Không được start lại lần thứ 2

RESPONSE:
- interview_session_id
- status
- started_at

YÊU CẦU:
- Laravel implementation chuẩn REST
- Validate quyền truy cập
- Sinh file tài liệu:
  /docs/Interview/StartInterviewSession.md

File MD chỉ chứa tài liệu API, không thêm mô tả hệ thống.
