DOCUMENT BA – INTERVIEW PRACTICE PLATFORM
1. Project Overview  
   1.1 Objective  
   Develop a **technical interview practice platform** (Interview Practice Platform) for the IT industry, allowing users to practice interview questions by:

- **Level:** Fresher / Junior / Middle / Senior / Tech Lead / Manager
- **Stack:** Backend, Frontend, Fullstack, Mobile, DevOps, Data, AI, etc.
- **Specific technologies:** PHP/Laravel, Java, NodeJS, Angular, React, Vue, Python, DevOps, System Design, etc.

The system supports multiple answer formats:
- Multiple Choice (MCQ)
- Essay (written)
- Voice (spoken answers)

1.2 Target Users
- Learners / Interview Candidates
- Instructors / Mentors
- Admin / Content Manager

2. Stakeholders

| Stakeholder | Description |
|--------------|-------------|
| End User (Candidate) | Person practicing interviews |
| Mentor | Evaluates and provides feedback on answers |
| Content Manager | Manages the question bank |
| Admin | System administrator |
| Product Owner | Defines product direction |

3. Actor Definitions
- **Guest:** User not logged in
- **User:** Logged-in user
- **Mentor:** Reviewer/evaluator of answers
- **Admin:** System administrator

4. Overview of Use Cases

**Authentication & Profile**
- UC-01: Register an account
- UC-02: Log in / Log out
- UC-03: Manage user profile

**Interview Setup**
- UC-04: Select interview level
- UC-05: Select stack / technology
- UC-06: Create interview session

**Question Management**
- UC-07: View question list
- UC-08: Take multiple-choice test
- UC-09: Submit essay answers
- UC-10: Answer by voice

**Evaluation & Feedback**
- UC-11: Automatic scoring (MCQ)
- UC-12: AI analysis of essay answers
- UC-13: AI analysis of voice answers
- UC-14: Manual evaluation by mentor

**Reporting**
- UC-15: View interview results
- UC-16: Compare results over time
- UC-17: Suggest skill improvements

**Content & Admin**
- UC-18: Manage levels
- UC-19: Manage stacks / technologies
- UC-20: CRUD question bank
- UC-21: Manage user roles and permissions

5. Detailed Use Cases

### UC-11A: AI Interview Scoring (Essay / Voice)
**Actor:** AI System

**Description:** The AI system automatically evaluates candidate interview answers.

**Pre-condition:**
- User has submitted an answer
- Question has an evaluation rubric

**Main Flow:**
1. System sends content (text/transcript) to AI engine
2. AI analyzes based on criteria:
   - Knowledge accuracy
   - Completeness of content
   - Logical structure
   - Level-specific keywords
   - Communication clarity (for voice)
3. AI returns:
   - Score (0–100)
   - Detailed feedback
   - Level fit assessment (Below / Match / Above)
4. System saves AI Score

**Post-condition:**  
AI results are linked to the Interview Session

**Exception:**  
AI timeout → mark as pending

---

### UC-06: Create Interview Session
**Actor:** User

**Description:** User initiates an interview session based on selected level and stack.

**Pre-condition:**
- User is logged in
- At least one corresponding question set exists

**Main Flow:**
1. User selects level (e.g., Senior)
2. User selects stack (e.g., Backend – Laravel)
3. User selects question type (MCQ / Essay / Voice)
4. User clicks “Start Interview”
5. System creates Interview Session and loads question list

**Post-condition:**  
Interview Session is saved

**Exception:**  
No matching questions → display notification

---

### UC-08: Take Multiple-Choice Test
**Actor:** User

**Description:** User answers multiple-choice questions.

**Main Flow:**
1. System displays question + answer choices
2. User selects an answer
3. User moves to the next question
4. User submits the test
5. System auto-scores the test

**Post-condition:**  
Score is saved

---

### UC-09: Submit Essay Answer
**Actor:** User

**Description:** User provides text-based answers.

**Main Flow:**
1. System displays essay question
2. User types the answer
3. User submits response
4. System saves content
5. AI analyzes content (keywords, logic, completeness)

---

### UC-10: Answer by Voice
**Actor:** User

**Description:** User answers interview questions by recording voice responses.

**Main Flow:**
1. User enables microphone
2. User records the answer
3. System converts voice → text (Speech-to-Text)
4. AI analyzes content
5. System saves voice file + transcript

**Exception:**  
Microphone access denied

---

### UC-14: Manual Evaluation by Mentor
**Actor:** Mentor

**Description:** Mentor manually evaluates essay or voice answers.

**Main Flow:**
1. Mentor views list of submissions to grade
2. Mentor reads/listens to answers
3. Mentor enters score + feedback
4. System saves results

---

6. Business Rules
- Each question belongs to exactly one level – one stack – one type
- MCQ questions are 100% auto-gradable
- Essay & Voice answers are initially AI-scored using rubrics
- Mentor can override AI scores (with change history logged)
- Interview Sessions cannot be modified after submission
- Final score = (AI Score × weight%) + (Mentor Score × weight%)

---

7. Non-Functional Requirements
- **Performance:** Response time < 2s
- **Scalability:** Support thousands of concurrent sessions
- **Security:** JWT/Auth, role-based access control
- **Storage:** Store voice files (S3 / Cloud Storage)

---

8. Future Scope (Extensions)
- Real-time mock interviews (video call)
- Ranking by stack / level
- Export results as PDF report
- Integration with ATS / HR systems

---

This document serves as a foundation for:
- Product Specification
- System Design
- Database Design
- API Design  