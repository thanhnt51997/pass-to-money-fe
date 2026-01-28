'use client';

import React from 'react';
import { InterviewResult } from '@/modules/interview/types';
import { Award, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface ResultHeaderProps {
    result: InterviewResult;
}

export default function ResultHeader({ result }: ResultHeaderProps) {
    // Calculate score percentage
    const score = result.overall_score || 0;

    // Determine color based on score
    const getScoreColor = (s: number) => {
        if (s >= 80) return 'text-green-400 border-green-500/50 from-green-500/10 to-transparent';
        if (s >= 60) return 'text-yellow-400 border-yellow-500/50 from-yellow-500/10 to-transparent';
        return 'text-red-400 border-red-500/50 from-red-500/10 to-transparent';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-[#09090b] border border-white/10 rounded-2xl">
            {/* Overall Score Circle */}
            <div className="md:col-span-1 flex flex-col items-center justify-center p-4 relative group">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Background Circle */}
                    <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                    {/* Progress Circle (simplified visual) */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className={getScoreColor(score).split(' ')[0]}
                            strokeDasharray="377"
                            strokeDashoffset={377 - (377 * score) / 100}
                        />
                    </svg>
                    <div className="flex flex-col items-center">
                        <span className={`text-3xl font-bold ${getScoreColor(score).split(' ')[0]}`}>
                            {score}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Score</span>
                    </div>
                </div>
                <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium border ${getScoreColor(score).split(' ')[0].replace('text-', 'border-').replace('400', '500/30')} bg-white/5`}>
                    {/* Use level_fit if available or fallback based on score */}
                    {score >= 80 ? 'Excellent Match' : score >= 60 ? 'Potential Match' : 'Needs Improvement'}
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                            <Target size={18} />
                        </div>
                        <span className="text-sm text-gray-400 font-medium">Focus Area</span>
                    </div>
                    <p className="text-white font-medium">{result.stack}</p>
                    <span className="text-xs text-gray-500">{result.level} Level</span>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                            <Award size={18} />
                        </div>
                        <span className="text-sm text-gray-400 font-medium">Questions</span>
                    </div>
                    <p className="text-white font-medium">{result.question_results?.length || 0} Total</p>
                    <span className="text-xs text-gray-500">Evaluated by AI</span>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-yellow-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400">
                            <TrendingUp size={18} />
                        </div>
                        <span className="text-sm text-gray-400 font-medium">Summary</span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2">
                        {result.feedback || 'No specific feedback provided yet.'}
                    </p>
                </div>
            </div>

            {/* Warning if Score is Pending (if 0 or very low unexpectedly?) */}
            {score === 0 && (
                <div className="md:col-span-4 mt-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
                    <AlertCircle className="text-blue-400" size={18} />
                    <p className="text-sm text-blue-300">
                        Scores might still be processing. Refresh if you participated recently.
                    </p>
                </div>
            )}
        </div>
    );
}

