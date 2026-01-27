Triển khai API "Submit Interview Session".

API SPEC:
- Method: POST
- Endpoint: /api/interviews/{id}/submit
- Auth: Required

BUSINESS RULE:
- Chỉ submit khi status = in_progress
- Khi submit:
    - status → completed
    - submitted_at = now()
- Không cho chỉnh sửa answer sau submit

RESPONSE:
- interview_session_id
- status
- submitted_at

YÊU CẦU:
- Code backend Laravel
- Trigger event InterviewSubmitted (chưa cần listener)
- Sinh file:
  /docs/Interview/SubmitInterview.md
