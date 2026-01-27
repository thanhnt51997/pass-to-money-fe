Bạn đang là Senior Backend Developer.

Hãy triển khai API "Create Interview Session" cho hệ thống phỏng vấn ứng viên với các yêu cầu sau:

TECH STACK:
- Backend: Laravel (REST API)
- Auth: Bearer Token
- Database: MySQL
- Không viết Unit Test

CHỨC NĂNG:
- Tạo một interview session mới cho ứng viên
- Snapshot toàn bộ câu hỏi tại thời điểm tạo
- Mỗi session chỉ thuộc về 1 ứng viên
- Session có trạng thái: pending | in_progress | completed

API SPEC:
- Method: POST
- Endpoint: /api/interviews
- Auth: Required

REQUEST BODY:
- candidate_id (uuid, required)
- position_id (uuid, required)
- level (string: junior|middle|senior)
- question_set_id (uuid, required)

BUSINESS RULE:
- Ứng viên không được có 2 interview session đang pending hoặc in_progress
- Câu hỏi phải được copy snapshot, không dùng reference trực tiếp
- Ghi nhận created_by (user_id)

RESPONSE:
- interview_session_id
- status
- total_questions
- started_at (nullable)

YÊU CẦU OUTPUT:
1. Laravel Controller + Service + Model cần thiết
2. Migration nếu cần
3. Validation rõ ràng
4. Không code frontend
5. Sinh tài liệu API dạng Markdown tại:
   /docs/Interview/CreateInterviewSession.md

FILE MD PHẢI CÓ:
- Title
- Endpoint
- Auth
- Request schema
- Response schema
- Curl example
- Error cases
  KHÔNG thêm bất kỳ nội dung nào khác.
