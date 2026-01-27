Dựa trên tài liệu BA hiện tại, dưới đây là cách phân rã chức năng (Functional Decomposition) theo chuẩn giao việc cho dev: rõ ràng, có thể đưa thẳng vào Jira / Backlog / Sprint Planning.

Tôi chia theo 4 lớp mà dev dễ làm nhất:

Module

Feature

Sub-feature / Task

Output kỹ thuật mong đợi

1. AUTHENTICATION & USER PROFILE
   Module: User Management
   Feature Code	Chức năng	Giao cho dev làm gì
   UM-01	Đăng ký	API register, validate email/password
   UM-02	Đăng nhập	JWT/Auth, refresh token
   UM-03	Phân quyền	Role: User / Mentor / Admin
   UM-04	Hồ sơ ứng viên	CRUD profile, level mục tiêu
   UM-05	Lịch sử phỏng vấn	List interview sessions

Output dev

Tables: users, roles, permissions

API: /auth/login, /auth/register

Middleware RBAC

2. INTERVIEW SETUP & FLOW
   Module: Interview Session
   Feature Code	Chức năng	Task cho dev
   IS-01	Chọn level	API get levels
   IS-02	Chọn stack	API get stacks
   IS-03	Chọn loại câu hỏi	MCQ / Essay / Voice
   IS-04	Tạo session	Generate interview_session
   IS-05	Load câu hỏi	Random theo rule

Business rule dev cần lưu ý

Level + Stack + Question Type

Không đủ câu hỏi → reject

Output

Table: interview_sessions

API: POST /interview/start

3. QUESTION BANK MANAGEMENT
   Module: Question Management (Admin)
   Feature Code	Chức năng	Task cho dev
   QB-01	CRUD Level	Fresher → Senior
   QB-02	CRUD Stack	Laravel, React…
   QB-03	CRUD Question	Nội dung câu hỏi
   QB-04	Question Type	MCQ / Essay / Voice
   QB-05	Rubric AI	Tiêu chí chấm

Output

Tables: questions, question_options, rubrics

Admin UI / Filament / CMS

4. ANSWERING ENGINE
   Module: Answer Handling
   4.1 Trắc nghiệm (MCQ)
   Feature	Task
   MCQ-01	Render câu hỏi
   MCQ-02	Submit answer
   MCQ-03	Auto grading
   MCQ-04	Save score

Output

Table: answers_mcq

Logic chấm điểm rule-based

4.2 Tự luận (Essay)
Feature	Task
ES-01	Editor trả lời
ES-02	Submit text
ES-03	Lưu raw answer
ES-04	Trigger AI scoring

Output

Table: answers_essay

Queue job gọi AI

4.3 Voice
Feature	Task
VO-01	Record audio
VO-02	Upload file
VO-03	Speech-to-Text
VO-04	Gửi transcript cho AI

Output

Storage: S3/Cloud

Table: answers_voice

5. AI SCORING ENGINE (CORE VALUE)
   Module: AI Evaluation
   Feature Code	Chức năng	Task
   AI-01	Prompt builder	Theo Level + Stack
   AI-02	Essay scoring	Gọi LLM
   AI-03	Voice scoring	Transcript → LLM
   AI-04	Score normalize	0–100
   AI-05	Level fit detect	Below / Match / Above
   AI-06	Feedback summary	Strength / Weakness

Output

Table: ai_evaluations

JSON result (score, feedback)

6. MENTOR REVIEW (OPTIONAL / PRO)
   Module: Manual Review
   Feature	Task
   MR-01	List bài cần chấm
   MR-02	View AI result
   MR-03	Override score
   MR-04	Comment

Output

Table: mentor_reviews

Final score calculation

7. RESULT & REPORTING
   Module: Result & Analytics
   Feature	Task
   RP-01	Xem kết quả session
   RP-02	Chi tiết từng câu
   RP-03	So sánh theo thời gian
   RP-04	Gợi ý cải thiện
   RP-05	Export report

Output

API /reports

Chart data

8. ADMIN & SYSTEM
   Module: System Admin
   Feature	Task
   AD-01	User management
   AD-02	Permission
   AD-03	AI cost log
   AD-04	Config weight AI/Mentor