'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useInterviewResult } from '@/modules/interview/hooks';
import { InterviewResult } from '@/modules/interview/types';
import { ResultCard } from '@/components/interview/ResultCard';
import { Loader2, ArrowLeft, RotateCcw, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function InterviewResultPage() {
    const params = useParams();
    const router = useRouter();
    const sessionId = params.sessionId as string;

    const { getResult } = useInterviewResult();
    const [result, setResult] = useState<InterviewResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchResult = async () => {
            try {
                const data = await getResult(sessionId);
                if (isMounted) {
                    setResult(data);
                    setIsLoading(false);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.response?.data?.message || 'Failed to load results.');
                    setIsLoading(false);
                }
            }
        };

        if (sessionId) {
            fetchResult();
        }

        return () => {
            isMounted = false;
        };
    }, [sessionId, getResult]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
                <p className="text-gray-400">Analyzing your interview results...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
                <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 max-w-md mx-4">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-xl bg-white/10 px-6 py-2 hover:bg-white/20 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!result) return null;

    return (
        <div className="min-h-screen bg-[#050505] font-sans selection:bg-cyan-500/30 pb-20">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 h-full w-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] h-[50%] w-[50%] rounded-full bg-cyan-600/10 blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <main className="relative z-10 mx-auto max-w-4xl px-6 pt-12">
                {/* Header Actions */}
                <div className="mb-8 flex items-center justify-between">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>

                    <Link
                        href="/interview/start"
                        className="flex items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                    >
                        <RotateCcw className="h-4 w-4" />
                        New Interview
                    </Link>
                </div>

                {/* Header Text */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Interview Evaluation</h1>
                    <p className="text-gray-400">Here is how you performed in this session</p>
                </div>

                {/* Result Card */}
                <ResultCard
                    overallScore={result.overall_score}
                    level={result.level}
                    stack={result.stack}
                    feedback={result.feedback}
                    questionResults={result.question_results}
                />
            </main>
        </div>
    );
}
