'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInterviewResult } from '@/modules/interview/hooks';
import ResultHeader from '@/components/interview/result/ResultHeader';
import QuestionAnalysisList from '@/components/interview/result/QuestionAnalysisList';
import { Loader2, ArrowRight } from 'lucide-react';

export default function InterviewResultPage() {
    const params = useParams();
    const sessionId = params.sessionId as string;
    const router = useRouter();

    const { result, loading, error } = useInterviewResult(sessionId);

    if (loading && !result) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#050505] flex-col gap-4">
                <Loader2 className="animate-spin text-cyan-500" size={40} />
                <p className="text-gray-400 animate-pulse">Analyzing your interview performance...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#050505] text-red-400">
                Failed to load results. Please try refreshing.
            </div>
        );
    }

    // Fallback if result is empty
    if (!result) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Top Nav / Breadcrumbish */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Interview Results</h1>
                        <p className="text-gray-400 text-sm">Session ID: {sessionId}</p>
                    </div>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Back to Dashboard <ArrowRight size={16} />
                    </button>
                </div>

                {/* Score Header */}
                <ResultHeader result={result} />

                {/* Question Breakdown */}
                {result.question_results && result.question_results.length > 0 ? (
                    <QuestionAnalysisList results={result.question_results} />
                ) : (
                    <div className="p-8 text-center border border-dashed border-white/10 rounded-xl text-gray-500">
                        Detailed question analysis is being generated...
                    </div>
                )}
            </div>
        </div>
    );
}

