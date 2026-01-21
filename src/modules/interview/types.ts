/**
 * Interview Module Types
 * Based on BA: Interview Practice Platform
 */

export type QuestionType = 'MCQ' | 'ESSAY' | 'VOICE';

export type InterviewStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'EVALUATED';

export type Level = 'JUNIOR' | 'MIDDLE' | 'SENIOR' | 'LEAD';

export type Stack = 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'DEVOPS' | 'MOBILE';

/**
 * Interview Session
 */
export type InterviewSession = {
    id: string;
    level: Level;
    stack: Stack;
    status: InterviewStatus;
    started_at: string;
    submitted_at: string | null;
    total_questions: number;
    answered_questions: number;
};

/**
 * Question in Interview
 */
export type InterviewQuestion = {
    id: string;
    question_text: string;
    type: QuestionType;
    options?: string[]; // For MCQ only
    order: number;
    is_required: boolean;
};

/**
 * Answer Submission
 */
export type AnswerSubmission = {
    question_id: string;
    answer_text?: string; // For ESSAY
    selected_option?: string; // For MCQ
    voice_file_url?: string; // For VOICE
};

/**
 * Interview Result
 */
export type InterviewResult = {
    session_id: string;
    overall_score: number;
    level: Level;
    stack: Stack;
    submitted_at: string;
    evaluated_at: string | null;
    feedback: string | null;
    question_results: QuestionResult[];
};

export type QuestionResult = {
    question_id: string;
    question_text: string;
    user_answer: string;
    score: number;
    feedback: string;
};

/**
 * API Request/Response Types
 */
export type StartInterviewRequest = {
    level: Level;
    stack: Stack;
};

export type StartInterviewResponse = {
    success: boolean;
    data: {
        session_id: string;
        level: Level;
        stack: Stack;
        started_at: string;
    };
    message: string;
};

export type GetQuestionsResponse = {
    success: boolean;
    data: {
        session_id: string;
        questions: InterviewQuestion[];
    };
    message: string;
};

export type SubmitAnswerRequest = {
    session_id: string;
    question_id: string;
    answer_text?: string;
    selected_option?: string;
    voice_file_url?: string;
};

export type SubmitAnswerResponse = {
    success: boolean;
    data: {
        question_id: string;
        saved_at: string;
    };
    message: string;
};

export type SubmitInterviewRequest = {
    session_id: string;
};

export type SubmitInterviewResponse = {
    success: boolean;
    data: {
        session_id: string;
        submitted_at: string;
    };
    message: string;
};

export type GetResultResponse = {
    success: boolean;
    data: InterviewResult;
    message: string;
};
