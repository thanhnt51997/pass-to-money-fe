'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLoadQuestions, useSubmitAnswer, useInterviewNavigation, useSubmitInterview } from '@/modules/interview/hooks';
import { useInterviewStore } from '@/modules/interview/interview.store';
import { ProgressBar } from '@/components/interview/ProgressBar';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { NavigationButtons } from '@/components/interview/NavigationButtons';
import { Loader2, AlertCircle } from 'lucide-react';

export default function InterviewQuestionPage() {
    const params = useParams();
    const router = useRouter();
    const sessionId = params.sessionId as string;

    const { loadQuestions } = useLoadQuestions();
    const { submitAnswer } = useSubmitAnswer();
    const { submitInterview } = useSubmitInterview();

    const {
        questions,
        currentQuestionIndex,
        isLoading,
        answers,
        currentSession
    } = useInterviewStore();

    const {
        canGoNext,
        canGoPrevious,
        isLastQuestion,
        nextQuestion,
        previousQuestion,
    } = useInterviewNavigation();

    const [pageError, setPageError] = useState<string | null>(null);

    // Load questions on mount
    useEffect(() => {
        if (sessionId) {
            loadQuestions(sessionId).catch((err: any) => {
                setPageError(err.response?.data?.message || 'Failed to load questions.');
            });
        }
    }, [sessionId, loadQuestions]);

    // Handle answer change
    const handleAnswerChange = (value: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return;

        // Optimistic update happens in store within hook if needed, 
        // but here we just trigger the auto-save logic via submitAnswer
        // Ideally submitAnswer updates the store 'answers' state immediately for UI responsiveness

        // We need to determine the format based on question type
        const payload: any = {
            question_id: currentQuestion.id,
        };

        if (currentQuestion.type === 'MCQ') {
            payload.selected_option = value;
        } else if (currentQuestion.type === 'ESSAY') {
            payload.answer_text = value;
        } else if (currentQuestion.type === 'VOICE') {
            payload.voice_file_url = value;
        }

        submitAnswer(payload).catch(console.error);
    };

    // Get current answer value
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

    const getAnswerValue = () => {
        if (!currentAnswer) return '';
        if (currentQuestion?.type === 'MCQ') return currentAnswer.selected_option || '';
        if (currentQuestion?.type === 'ESSAY') return currentAnswer.answer_text || '';
        if (currentQuestion?.type === 'VOICE') return currentAnswer.voice_file_url || '';
        return '';
    };

    // Derived state for submit button
    const canSubmit = useInterviewStore(state => state.canSubmitInterview());
    const isSubmitting = useInterviewStore(state => state.isSubmitting);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#050505]">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    if (pageError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
                <div className="text-center">
                    <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-4" />
                    <h2 className="text-xl font-bold mb-2">Error Loading Interview</h2>
                    <p className="text-gray-400 mb-4">{pageError}</p>
                    <button
                        onClick={() => router.push('/interview/start')}
                        className="rounded-full bg-white/10 px-6 py-2 hover:bg-white/20"
                    >
                        Return to Start
                    </button>
                </div>
            </div>
        );
    }

    if (!currentQuestion) {
        return null; // Should not happen after loading
    }

    return (
        <div className="min-h-screen bg-[#050505] font-sans selection:bg-cyan-500/30 pb-20">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 h-full w-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <main className="relative z-10 mx-auto max-w-4xl px-6 pt-8">
                {/* Header / Progress */}
                <div className="mb-8">
                    <ProgressBar
                        current={Object.keys(answers).length}
                        total={questions.length}
                    />
                </div>

                {/* Question Card */}
                <div className="mb-8">
                    <QuestionCard
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={questions.length}
                        questionText={currentQuestion.question_text}
                        questionType={currentQuestion.type}
                        isRequired={currentQuestion.is_required}
                        options={currentQuestion.options}
                        value={getAnswerValue()}
                        onChange={handleAnswerChange}
                        onSave={(val) => handleAnswerChange(val)} // Essay input debounce save
                    />
                </div>

                {/* Navigation */}
                <NavigationButtons
                    canGoPrevious={canGoPrevious}
                    canGoNext={canGoNext}
                    isLastQuestion={isLastQuestion}
                    canSubmit={canSubmit}
                    isSubmitting={isSubmitting}
                    onPrevious={previousQuestion}
                    onNext={nextQuestion}
                    onSubmit={submitInterview}
                />
            </main>
        </div>
    );
}
