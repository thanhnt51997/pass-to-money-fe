Triển khai API "Submit Interview Answer".

API SPEC:
- Method: POST
- Endpoint: /api/interviews/{id}/answers
- Auth: Required

REQUEST BODY:
- question_id (uuid)
- answer_content (string | array)
- time_spent (int, seconds)

BUSINESS RULE:
- Không cho trả lời nếu session completed
- Một câu hỏi có thể update answer
- Validate question thuộc session

RESPONSE:
- success (boolean)

YÊU CẦU:
- Laravel Service xử lý nghiệp vụ
- Lưu answer độc lập
- Sinh file:
  /docs/Interview/SubmitAnswer.md
