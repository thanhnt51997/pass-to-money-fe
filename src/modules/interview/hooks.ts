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
        async (level: Level, stack: Stack) => {
            setLoading(true);
            resetInterview();

            try {
                const response = await interviewApi.startInterview({ level, stack });

                setSession({
                    id: response.data.session_id,
                    level: response.data.level,
                    stack: response.data.stack,
                    status: 'IN_PROGRESS',
                    started_at: response.data.started_at,
                    submitted_at: null,
                    total_questions: 0,
                    answered_questions: 0,
                });

                // Navigate to questions page
                router.push(`/interview/${response.data.session_id}/question`);

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
                const response = await interviewApi.getQuestions(sessionId);

                setQuestions(response.data.questions);

                if (currentSession) {
                    setSession({
                        ...currentSession,
                        total_questions: response.data.questions.length,
                    });
                }

                return response;
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        },
        [setQuestions, setLoading, setSession, currentSession]
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
 * - Navigate to result page
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
export const useInterviewResult = () => {
    const getResult = useCallback(async (sessionId: string) => {
        try {
            const response = await interviewApi.getResult(sessionId);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, []);

    return { getResult };
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
