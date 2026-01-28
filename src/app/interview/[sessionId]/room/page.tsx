'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLoadQuestions, useSubmitAnswer, useSubmitInterview, useInterviewNavigation } from '@/modules/interview/hooks';
import { useInterviewStore } from '@/modules/interview/interview.store';
import QuestionNavigation from '@/components/interview/room/QuestionNavigation';
import QuestionDisplay from '@/components/interview/room/QuestionDisplay';
import Timer from '@/components/interview/room/Timer';
import { Loader2, ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';
import { AnswerSubmission } from '@/modules/interview/types';

export default function InterviewRoomPage() {
    const params = useParams();
    const sessionId = params.sessionId as string;
    const router = useRouter();

    const { loadQuestions } = useLoadQuestions();
    const { submitAnswer } = useSubmitAnswer();
    const { submitInterview, canSubmit } = useSubmitInterview();

    // Store access
    const {
        questions,
        currentSession,
        answers,
        isLoading,
        isSubmitting
    } = useInterviewStore();

    const {
        currentQuestionIndex,
        isLastQuestion,
        canGoNext,
        canGoPrevious,
        nextQuestion,
        previousQuestion,
        goToQuestion
    } = useInterviewNavigation();

    // Load data on mount
    useEffect(() => {
        if (sessionId) {
            loadQuestions(sessionId).catch(err => {
                console.error('Failed to load questions:', err);
                // Redirect or show error
            });
        }
    }, [sessionId, loadQuestions]);

    // Derived state
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;

    // Handlers
    const handleAnswerChange = async (val: any) => {
        if (!currentQuestion) return;

        // Construct answer object based on type
        const submission: Omit<AnswerSubmission, 'question_id'> & { question_id: string } = {
            question_id: currentQuestion.id
        };

        if (currentQuestion.type === 'MCQ') {
            submission.selected_option = val;
        } else if (currentQuestion.type === 'ESSAY') {
            submission.answer_text = val;
        } else if (currentQuestion.type === 'VOICE') {
            // For now assume val is text transcript or file url ??
            // Let's assume text for fallback logic in QuestionDisplay
            submission.answer_text = val;
            // submission.voice_file_url = ...;
        }

        // Optimistic update in store happens in hook
        // Debounce actual API call in real app, but here direct for simplicity (or let hook handle it)
        // ideally hook debounces. For now, we just call it.
        try {
            await submitAnswer(submission);
        } catch (e) {
            console.error('Auto-save failed', e);
        }
    };

    const handleSubmitInterview = async () => {
        if (!window.confirm('Are you sure you want to submit your interview? You cannot change answers after submission.')) {
            return;
        }
        try {
            await submitInterview();
        } catch (error) {
            console.error('Submit interview failed:', error);
            alert('Failed to submit interview. Please try again.');
        }
    };

    if (isLoading || !currentSession) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#050505] text-white">
                <Loader2 className="animate-spin mr-2 text-cyan-500" />
                Loading your interview...
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#050505] text-white flex-col gap-4">
                <div className="text-xl">No questions found for this session.</div>
                <button
                    onClick={() => router.push('/interview')}
                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                    Back to Interviews
                </button>
            </div>
        );
    }

    const answeredIndices = new Set(
        questions.map((q, idx) => answers[q.id] ? idx : -1).filter(i => i !== -1)
    );

    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
            {/* Sidebar Navigation */}
            <QuestionNavigation
                questions={questions}
                currentIndex={currentQuestionIndex}
                onSelect={goToQuestion}
                answeredIndices={answeredIndices}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full min-w-0">
                {/* Header */}
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#09090b]">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white">
                                {currentSession.level} / {currentSession.stack}
                            </span>
                            <span className="text-xs text-gray-400">
                                Session ID: {currentSession.id.substring(0, 8)}...
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Timer />
                        <button
                            onClick={handleSubmitInterview}
                            disabled={!canSubmit || isSubmitting}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${canSubmit
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 hover:from-green-400 hover:to-emerald-500'
                                : 'bg-white/5 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                            Submit Interview
                        </button>
                    </div>
                </header>

                {/* Question Content */}
                <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                    {currentQuestion && (
                        <QuestionDisplay
                            question={currentQuestion}
                            answer={
                                currentQuestion.type === 'MCQ'
                                    ? currentAnswer?.selected_option
                                    : currentAnswer?.answer_text // Handles Essay and Voice transcript fallback
                            }
                            onAnswerChange={handleAnswerChange}
                        />
                    )}
                </main>

                {/* Footer Navigation */}
                <footer className="h-20 border-t border-white/10 bg-[#09090b] flex items-center justify-between px-8">
                    <button
                        onClick={previousQuestion}
                        disabled={!canGoPrevious}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ArrowLeft size={20} />
                        Previous
                    </button>

                    <span className="text-sm text-gray-500 font-medium">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </span>

                    <button
                        onClick={nextQuestion}
                        disabled={!canGoNext} // Disable next if it's last question
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${!canGoNext
                            ? 'opacity-0 pointer-events-none' // Hide Next on last question
                            : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                            }`}
                    >
                        Next
                        <ArrowRight size={20} />
                    </button>
                </footer>
            </div>
        </div>
    );
}
