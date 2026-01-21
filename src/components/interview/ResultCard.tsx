'use client';

import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { QuestionResult } from '@/modules/interview/types';

interface ResultCardProps {
    overallScore: number;
    level: string;
    stack: string;
    feedback?: string | null;
    questionResults: QuestionResult[];
}

/**
 * ResultCard Component
 * Display interview evaluation results
 */
export function ResultCard({
    overallScore,
    level,
    stack,
    feedback,
    questionResults,
}: ResultCardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreIcon = (score: number) => {
        if (score >= 80) return <TrendingUp className="h-5 w-5" />;
        if (score >= 60) return <Minus className="h-5 w-5" />;
        return <TrendingDown className="h-5 w-5" />;
    };

    return (
        <div className="space-y-6">
            {/* Overall Score */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col items-center gap-6">
                    {/* Score Circle */}
                    <div className="relative">
                        <svg className="h-40 w-40 -rotate-90 transform">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                                className="text-white/10"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 70}`}
                                strokeDashoffset={`${2 * Math.PI * 70 * (1 - overallScore / 100)}`}
                                className={`transition-all duration-1000 ${getScoreColor(overallScore)}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Trophy className="h-8 w-8 text-cyan-400 mb-2" />
                            <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                                {overallScore}
                            </span>
                            <span className="text-sm text-gray-400">/ 100</span>
                        </div>
                    </div>

                    {/* Level & Stack */}
                    <div className="flex items-center gap-3">
                        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
                            {level}
                        </span>
                        <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400">
                            {stack}
                        </span>
                    </div>

                    {/* Overall Feedback */}
                    {feedback && (
                        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-gray-300 leading-relaxed">{feedback}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Question Results */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Question Breakdown</h3>

                {questionResults.map((result, index) => (
                    <div
                        key={result.question_id}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-white/20"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-400">
                                        Question {index + 1}
                                    </span>
                                    <div className={`flex items-center gap-1 ${getScoreColor(result.score)}`}>
                                        {getScoreIcon(result.score)}
                                        <span className="font-bold">{result.score}/100</span>
                                    </div>
                                </div>

                                <p className="text-sm text-white">{result.question_text}</p>

                                <div className="rounded-xl bg-white/5 p-3">
                                    <p className="text-xs text-gray-400 mb-1">Your Answer:</p>
                                    <p className="text-sm text-gray-300">{result.user_answer}</p>
                                </div>

                                {result.feedback && (
                                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
                                        <p className="text-xs text-cyan-400 mb-1">Feedback:</p>
                                        <p className="text-sm text-gray-300">{result.feedback}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
