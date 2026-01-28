import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { interviewApi } from './api';
import { useInterviewStore } from './interview.store';
import {
    StartInterviewRequest,
    SubmitAnswerRequest,
    Level,
    Stack,
} from './types';

/**
 * Start Interview Hook
 * Business Rules:
 * - Create new interview session
 * - Navigate to question page
 */
export const useStartInterview = () => {
    const router = useRouter();
    const { setSession, setLoading, resetInterview } = useInterviewStore();

    const startInterview = useCallback(
        async (templateId: string) => {
            setLoading(true);
            resetInterview();

            try {
                const response = await interviewApi.startInterview({ template_id: templateId });

                setSession({
                    id: response.data.interview_id,
                    level: response.data.level,
                    stack: response.data.stack,
                    status: 'IN_PROGRESS', // API returns 'created', but UI considers it strictly 'IN_PROGRESS' once started?
                    // Actually API says status: 'created'. Let's map it or keep it.
                    // Store expects 'IN_PROGRESS' | 'SUBMITTED' | 'EVALUATED'.
                    // 'created' allows 'IN_PROGRESS' logic on frontend (answering questions).
                    started_at: new Date().toISOString(), // API doesn't return started_at in new contract?
                    // New response: { interview_id, template_id, level, stack, status }
                    // We can use current time as started_at for local store purpose
                    submitted_at: null,
                    total_questions: 0,
                    answered_questions: 0,
                });

                // Navigate to room page
                router.push(`/interview/${response.data.interview_id}/room`);

                return response;
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        },
        [router, setSession, setLoading, resetInterview]
    );

    return { startInterview };
};

/**
 * Load Questions Hook
 * Business Rules:
 * - Load all questions for session
 * - Questions are immutable
 */
export const useLoadQuestions = () => {
    const { setQuestions, setLoading, setSession, currentSession } = useInterviewStore();

    const loadQuestions = useCallback(
        async (sessionId: string) => {
            setLoading(true);

            try {
                // Return both result to allow handling
                const [questionsRes, sessionRes] = await Promise.all([
                    interviewApi.getQuestions(sessionId),
                    interviewApi.getSession(sessionId),
                ]);

                setQuestions(questionsRes.data.questions);

                // Check if sessionRes has data
                if (sessionRes.data) {
                    setSession(sessionRes.data);
                }

                // If we had a currentSession logic before, we can keep it as backup or merge?
                // But fresh fetch is source of truth.

                // We return questionsRes to keep backward compatibility with component expectation
                return questionsRes;
            } catch (error) {
                console.error('Error loading interview data:', error);
                throw error;
            } finally {
                setLoading(false);
            }
        },
        [setQuestions, setLoading, setSession]
    );

    return { loadQuestions };
};

/**
 * Submit Answer Hook
 * Business Rules:
 * - Auto-save answer immediately
 * - Support MCQ, Essay, Voice
 */
export const useSubmitAnswer = () => {
    const { saveAnswer, currentSession } = useInterviewStore();

    const submitAnswer = useCallback(
        async (data: Omit<SubmitAnswerRequest, 'session_id'>) => {
            if (!currentSession) {
                throw new Error('No active session');
            }

            try {
                const response = await interviewApi.submitAnswer({
                    session_id: currentSession.id,
                    ...data,
                });

                // Save to local store
                saveAnswer(data.question_id, {
                    question_id: data.question_id,
                    answer_text: data.answer_text,
                    selected_option: data.selected_option,
                    voice_file_url: data.voice_file_url,
                });

                return response;
            } catch (error) {
                throw error;
            }
        },
        [currentSession, saveAnswer]
    );

    return { submitAnswer };
};

/**
 * Submit Interview Hook
 * Business Rules:
 * - Finalize interview
 * - All required questions must be answered
 * - Navigate to result pagef
 */
export const useSubmitInterview = () => {
    const router = useRouter();
    const { currentSession, setSubmitting, canSubmitInterview } = useInterviewStore();

    const submitInterview = useCallback(async () => {
        if (!currentSession) {
            throw new Error('No active session');
        }

        if (!canSubmitInterview()) {
            throw new Error('Please answer all required questions');
        }

        setSubmitting(true);

        try {
            const response = await interviewApi.submitInterview({
                session_id: currentSession.id,
            });

            // Navigate to result page
            router.push(`/interview/${currentSession.id}/result`);

            return response;
        } catch (error) {
            throw error;
        } finally {
            setSubmitting(false);
        }
    }, [currentSession, router, setSubmitting, canSubmitInterview]);

    return { submitInterview, canSubmit: canSubmitInterview() };
};

/**
 * Get Interview Result Hook
 * Business Rules:
 * - Retrieve evaluation results
 * - Poll if evaluation is pending
 */
/**
 * Get Interview Result Hook
 * Business Rules:
 * - Retrieve evaluation results
 * - Poll if evaluation is pending
 */
import useSWR from 'swr';

export const useInterviewResult = (sessionId: string) => {
    // Poll every 3 seconds if we don't have a result or status is not finished
    // But API getResult returns the result. If logic is in backend, it might return 404 or partial data if not done?
    // Let's assume it returns { status: 'PENDING' } or similar if not ready, or we check a specific status field.
    // Based on `types.ts`, `InterviewResult` doesn't strictly have a status, but `InterviewSession` does.
    // Usually fetching result implies we want the *Result* object.

    // For now, let's just fetch. The Page will decide to poll or not.
    // Actually, SWR is great here.
    const { data, error, isLoading, mutate } = useSWR(
        sessionId ? `/api/interviews/${sessionId}/result` : null, // Cache key
        () => interviewApi.getResult(sessionId).then(res => res.data),
        {
            refreshInterval: (data) => {
                // If data exists but maybe incomplete? Or if we want to support "processing" UI?
                // If the *page* sees "PENDING" score, it might keep polling.
                // Let's rely on the Page to trigger revalidation or just set fixed interval if needed.
                return 0; // Disable auto poll by default, let UI control or just fetch once.
            },
            revalidateOnFocus: false
        }
    );

    return { result: data, loading: isLoading, error, mutate };
};

/**
 * Interview Navigation Hook
 */
export const useInterviewNavigation = () => {
    const {
        currentQuestionIndex,
        questions,
        nextQuestion,
        previousQuestion,
        setCurrentQuestionIndex,
    } = useInterviewStore();

    const canGoNext = currentQuestionIndex < questions.length - 1;
    const canGoPrevious = currentQuestionIndex > 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return {
        currentQuestionIndex,
        totalQuestions: questions.length,
        canGoNext,
        canGoPrevious,
        isLastQuestion,
        nextQuestion,
        previousQuestion,
        goToQuestion: setCurrentQuestionIndex,
    };
};
