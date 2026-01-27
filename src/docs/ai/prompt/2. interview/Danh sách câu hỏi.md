Triển khai API "Get Interview Questions".

API SPEC:
- Method: GET
- Endpoint: /api/interviews/{id}/questions
- Auth: Required

RESPONSE:
- interview_session_id
- questions[]:
    - question_id
    - type (text | choice | coding)
    - content
    - options (nullable)
    - order

BUSINESS RULE:
- Chỉ cho phép khi session in_progress
- Dữ liệu lấy từ snapshot, không join bảng question gốc

YÊU CẦU:
- Controller + Query tối ưu
- Không lộ đáp án đúng
- Sinh tài liệu:
  /docs/Interview/GetInterviewQuestions.md
