import { create } from 'zustand';
import { InterviewSession, InterviewQuestion, AnswerSubmission } from './types';

/**
 * Interview Store
 * Business Rules:
 * - Manage current interview session state
 * - Track answered questions
 * - Persist answers locally before submission
 */

interface InterviewStore {
    // Current session
    currentSession: InterviewSession | null;
    questions: InterviewQuestion[];
    answers: Record<string, AnswerSubmission>;
    currentQuestionIndex: number;

    // Loading states
    isLoading: boolean;
    isSubmitting: boolean;

    // Actions
    setSession: (session: InterviewSession) => void;
    setQuestions: (questions: InterviewQuestion[]) => void;
    saveAnswer: (questionId: string, answer: AnswerSubmission) => void;
    setCurrentQuestionIndex: (index: number) => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    setLoading: (loading: boolean) => void;
    setSubmitting: (submitting: boolean) => void;
    resetInterview: () => void;

    // Computed
    getProgress: () => number;
    canSubmitInterview: () => boolean;
}

export const useInterviewStore = create<InterviewStore>((set, get) => ({
    currentSession: null,
    questions: [],
    answers: {},
    currentQuestionIndex: 0,
    isLoading: false,
    isSubmitting: false,

    setSession: (session) => set({ currentSession: session }),

    setQuestions: (questions) => set({ questions }),

    saveAnswer: (questionId, answer) => set((state) => ({
        answers: {
            ...state.answers,
            [questionId]: answer,
        },
    })),

    setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

    nextQuestion: () => set((state) => ({
        currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            state.questions.length - 1
        ),
    })),

    previousQuestion: () => set((state) => ({
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),

    setLoading: (loading) => set({ isLoading: loading }),

    setSubmitting: (submitting) => set({ isSubmitting: submitting }),

    resetInterview: () => set({
        currentSession: null,
        questions: [],
        answers: {},
        currentQuestionIndex: 0,
        isLoading: false,
        isSubmitting: false,
    }),

    getProgress: () => {
        const state = get();
        if (state.questions.length === 0) return 0;
        return (Object.keys(state.answers).length / state.questions.length) * 100;
    },

    canSubmitInterview: () => {
        const state = get();
        const requiredQuestions = state.questions.filter(q => q.is_required);
        const answeredRequired = requiredQuestions.filter(
            q => state.answers[q.id]
        );
        return answeredRequired.length === requiredQuestions.length;
    },
}));
