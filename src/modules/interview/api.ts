import http from '@/lib/http';
import { API_ENDPOINTS } from './constants';
import {
    StartInterviewRequest,
    StartInterviewResponse,
    GetQuestionsResponse,
    SubmitAnswerRequest,
    SubmitAnswerResponse,
    SubmitInterviewRequest,
    SubmitInterviewResponse,
    GetResultResponse,
    GetSessionResponse,
} from './types';

/**
 * Interview API
 * Business Rules:
 * - Start interview session with Template ID
 * - Load questions for session
 * - Submit answers (MCQ / Essay / Voice)
 * - Submit interview when complete
 * - Get evaluation result
 */

export const interviewApi = {
    /**
     * Start Interview Session
     * Business Rules:
     * - Create new session from Template ID
     * - Questions are snapshotted at creation time
     */
    startInterview: async (data: StartInterviewRequest): Promise<StartInterviewResponse> => {
        const response = await http.post<StartInterviewResponse>(
            '/api/interviews',
            data
        );
        return response.data;
    },

    /**
     * Get Interview Session
     * Business Rules:
     * - Retrieve session details
     * - Workaround: Fetch list and filter by ID since direct endpoint is missing
     */
    getSession: async (sessionId: string): Promise<GetSessionResponse> => {
        // Fetch recent sessions (adjust per_page as needed)
        const response = await http.get(API_ENDPOINTS.GET_INTERVIEWS, {
            params: { per_page: 50 }
        });

        const session = response.data.data.items.find((s: any) => String(s.id) === String(sessionId));

        if (!session) {
            throw new Error(`Session ${sessionId} not found in recent interviews`);
        }

        return {
            success: true,
            data: {
                ...session,
                id: String(session.id)
            },
            message: 'Session retrieved successfully'
        };
    },


    /**
     * Get Interview Questions
     * Business Rules:
     * - Load all questions for active session
     * - Questions are immutable after session creation
     */
    getQuestions: async (sessionId: string): Promise<GetQuestionsResponse> => {
        const url = API_ENDPOINTS.GET_QUESTIONS.replace(':sessionId', sessionId);
        const response = await http.get(url);

        // Map backend response matching docs to frontend domain
        const questions = response.data.data.questions.map((q: any) => ({
            id: String(q.question_id),
            question_text: q.content,
            type: q.type === 'choice' ? 'MCQ' : (q.type === 'theoretical' ? 'ESSAY' : 'VOICE'),
            options: q.options,
            order: q.order,
            is_required: true // Default to true as docs mentions mandatory logic but not field?
        }));

        return {
            ...response.data,
            data: {
                ...response.data.data,
                questions
            }
        };
    },

    /**
     * Submit Answer
     * Business Rules:
     * - Save answer immediately (auto-save)
     * - Support MCQ, Essay, Voice types
     * - Can update answer before final submission
     */
    submitAnswer: async (data: SubmitAnswerRequest): Promise<SubmitAnswerResponse> => {
        const url = API_ENDPOINTS.SUBMIT_ANSWER.replace(':sessionId', data.session_id);
        const response = await http.post<SubmitAnswerResponse>(url, {
            question_id: data.question_id,
            answer_content: data.answer_text,
            selected_option: data.selected_option,
            voice_file_url: data.voice_file_url,
        });
        return response.data;
    },

    /**
     * Submit Interview
     * Business Rules:
     * - Finalize interview session
     * - Trigger AI evaluation process
     * - Session becomes immutable after submission
     */
    submitInterview: async (data: SubmitInterviewRequest): Promise<SubmitInterviewResponse> => {
        const url = API_ENDPOINTS.SUBMIT_INTERVIEW.replace(':sessionId', data.session_id);
        const response = await http.post<SubmitInterviewResponse>(url);
        return response.data;
    },

    /**
     * Get Interview Result
     * Business Rules:
     * - Retrieve evaluation results
     * - Only available after AI evaluation completes
     */
    getResult: async (sessionId: string): Promise<GetResultResponse> => {
        const url = API_ENDPOINTS.GET_RESULT.replace(':sessionId', sessionId);
        const response = await http.get<GetResultResponse>(url);
        return response.data;
    },
};
