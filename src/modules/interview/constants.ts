/**
 * Interview Module Constants
 */

export const INTERVIEW_STATUS = {
    IN_PROGRESS: 'IN_PROGRESS',
    SUBMITTED: 'SUBMITTED',
    EVALUATED: 'EVALUATED',
} as const;

export const QUESTION_TYPES = {
    MCQ: 'MCQ',
    ESSAY: 'ESSAY',
    VOICE: 'VOICE',
} as const;

export const LEVELS = {
    JUNIOR: 'JUNIOR',
    MIDDLE: 'MIDDLE',
    SENIOR: 'SENIOR',
    LEAD: 'LEAD',
} as const;

export const STACKS = {
    FRONTEND: 'FRONTEND',
    BACKEND: 'BACKEND',
    FULLSTACK: 'FULLSTACK',
    DEVOPS: 'DEVOPS',
    MOBILE: 'MOBILE',
} as const;

export const API_ENDPOINTS = {
    START_INTERVIEW: '/api/interviews/start',
    GET_INTERVIEWS: '/api/interviews',
    GET_QUESTIONS: '/api/interviews/:sessionId/questions',
    SUBMIT_ANSWER: '/api/interviews/:sessionId/answers',
    SUBMIT_INTERVIEW: '/api/interviews/:sessionId/submit',
    GET_RESULT: '/api/interviews/:sessionId/result',
} as const;

export const LEVEL_LABELS: Record<string, string> = {
    JUNIOR: 'Junior',
    MIDDLE: 'Middle',
    SENIOR: 'Senior',
    LEAD: 'Lead',
};

export const STACK_LABELS: Record<string, string> = {
    FRONTEND: 'Frontend',
    BACKEND: 'Backend',
    FULLSTACK: 'Fullstack',
    DEVOPS: 'DevOps',
    MOBILE: 'Mobile',
};
