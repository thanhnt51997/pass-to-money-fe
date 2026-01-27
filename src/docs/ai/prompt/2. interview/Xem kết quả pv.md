Triển khai API "Get Interview Result".

API SPEC:
- Method: GET
- Endpoint: /api/interviews/{id}/result
- Auth: Required

RESPONSE:
- interview_session_id
- score_total
- score_detail[]
- ai_summary
- recommendation (hire | consider | reject)

BUSINESS RULE:
- Chỉ cho xem khi session completed
- Nếu chưa chấm → trả trạng thái pending_evaluation

YÊU CẦU:
- Read-only API
- Không xử lý AI ở đây
- Sinh file:
  /docs/Interview/GetInterviewResult.md
