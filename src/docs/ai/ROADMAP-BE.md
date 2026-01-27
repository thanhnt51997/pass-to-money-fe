```EPIC 1 – AUTHENTICATION & USER
STORY 1.1 – User Registration
Prompt
Implement user registration API using Laravel.

Business rules:
- Email must be unique
- Password hashed
- Default role = USER

Return JWT token after registration.

Create:
- Migration
- Model
- Controller
- Route

API Documentation required.

Do NOT include unit tests.

API DOC (AI phải sinh)
POST /api/auth/register

Input:
{
"name": "string",
"email": "string",
"password": "string"
}

Output:
{
"token": "jwt_token",
"user": {
"id": number,
"name": string,
"email": string,
"role": "USER"
}
}

Curl:
curl -X POST /api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"John","email":"john@mail.com","password":"123456"}'

STORY 1.2 – Login
Prompt
Implement login API with JWT authentication.

Rules:
- Validate credentials
- Return token and user info
- Reject invalid credentials

Include API documentation.

EPIC 2 – INTERVIEW SETUP
STORY 2.1 – Get Levels
Prompt
Implement API to fetch interview levels.

Levels example:
- Fresher
- Junior
- Middle
- Senior
- Tech Lead

Levels are managed by admin but API is public.

Include API documentation.

API DOC
GET /api/levels

Output:
[
{ "id": 1, "name": "Fresher" },
{ "id": 2, "name": "Junior" }
]

Curl:
curl -X GET /api/levels

STORY 2.2 – Start Interview Session
Prompt
Implement API to start an interview session.

Business rules:
- User must be authenticated
- Level + Stack must exist
- Random questions by rules
- Create interview_session record

Include API documentation.

API DOC
POST /api/interviews/start

Input:
{
"level_id": number,
"stack_id": number,
"question_types": ["MCQ","ESSAY","VOICE"]
}

Output:
{
"session_id": number,
"questions": [
{
"id": number,
"type": "MCQ|ESSAY|VOICE",
"content": "string"
}
]
}

Curl:
curl -X POST /api/interviews/start \
-H "Authorization: Bearer TOKEN" \
-H "Content-Type: application/json" \
-d '{"level_id":3,"stack_id":2,"question_types":["ESSAY"]}'

EPIC 3 – QUESTION ANSWERING
STORY 3.1 – Submit MCQ Answer
Prompt
Implement API to submit MCQ answer.

Rules:
- Auto grade immediately
- Store result
- One answer per question per session

Include API documentation.

STORY 3.2 – Submit Essay Answer
Prompt
Implement API to submit essay answer.

Rules:
- Save raw text
- Trigger AI evaluation job
- Mark answer status = PENDING_AI

Include API documentation.

API DOC
POST /api/answers/essay

Input:
{
"session_id": number,
"question_id": number,
"answer": "string"
}

Output:
{
"status": "PENDING_AI"
}

Curl:
curl -X POST /api/answers/essay \
-H "Authorization: Bearer TOKEN" \
-H "Content-Type: application/json" \
-d '{"session_id":1,"question_id":5,"answer":"Transaction ensures consistency"}'

STORY 3.3 – Submit Voice Answer
Prompt
Implement API to submit voice answer.

Rules:
- Upload audio file
- Store file path
- Save transcript (string input)
- Trigger AI evaluation

Include API documentation.

EPIC 4 – AI SCORING ENGINE (CỐT LÕI)
STORY 4.1 – AI Essay Evaluation
Prompt
Implement AI evaluation service for essay answers.

Business rules:
- Input: question, answer, level, stack
- Output score 0–100
- Return strengths, weaknesses, level_fit
- Store AI result as JSON

AI result structure must be consistent.

Include API documentation.

API DOC
POST /api/ai/evaluate/essay

Input:
{
"question": "string",
"answer": "string",
"level": "Senior",
"stack": "Laravel"
}

Output:
{
"score": number,
"level_fit": "BELOW|MATCH|ABOVE",
"strengths": [string],
"weaknesses": [string]
}

Curl:
curl -X POST /api/ai/evaluate/essay \
-H "Content-Type: application/json" \
-d '{"question":"Explain transaction","answer":"...","level":"Senior","stack":"Laravel"}'

STORY 4.2 – Voice Evaluation
Prompt
Implement AI evaluation for voice interview.

Rules:
- Accept transcript text
- Same scoring logic as essay
- Communication clarity must affect score

Include API documentation.

EPIC 5 – RESULT & REPORT
STORY 5.1 – Get Interview Result
Prompt
Implement API to get interview result summary.

Rules:
- Combine MCQ + AI scores
- Return per-question detail
- Final score calculation

Include API documentation.

API DOC
GET /api/interviews/{id}/result

Output:
{
"final_score": number,
"level_fit": "MATCH",
"details": [
{
"question_id": number,
"score": number,
"feedback": "string"
}
]
}

Curl:
curl -X GET /api/interviews/1/result \
-H "Authorization: Bearer TOKEN"