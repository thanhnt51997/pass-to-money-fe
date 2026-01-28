'use client';

import React, { useState } from 'react';
import { QuestionResult } from '@/modules/interview/types';
import { ChevronDown, CheckCircle, XCircle, MinusCircle } from 'lucide-react';

interface QuestionAnalysisListProps {
    results: QuestionResult[];
}

export default function QuestionAnalysisList({ results }: QuestionAnalysisListProps) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggle = (id: string) => {
        const next = new Set(expandedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setExpandedIds(next);
    };

    const getScoreIcon = (score: number) => {
        if (score >= 80) return <CheckCircle className="text-green-500" size={20} />;
        if (score >= 50) return <MinusCircle className="text-yellow-500" size={20} />;
        return <XCircle className="text-red-500" size={20} />;
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Detailed Analysis
                <span className="text-sm font-normal text-gray-500 ml-2">({results.length} questions)</span>
            </h3>

            {results.map((item, idx) => {
                const isExpanded = expandedIds.has(item.question_id);

                return (
                    <div
                        key={item.question_id}
                        className="bg-[#09090b] border border-white/5 rounded-xl overflow-hidden transition-all hover:border-white/10"
                    >
                        <div
                            onClick={() => toggle(item.question_id)}
                            className="p-5 flex items-start gap-4 cursor-pointer"
                        >
                            <div className="mt-0.5">{getScoreIcon(item.score)}</div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium text-base mb-1">
                                    {idx + 1}. {item.question_text}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span className="bg-white/5 px-2 py-0.5 rounded">Score: {item.score}/100</span>
                                </div>
                            </div>
                            <ChevronDown
                                className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                size={20}
                            />
                        </div>

                        {isExpanded && (
                            <div className="px-5 pb-5 border-t border-white/5 bg-white/[0.02]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    {/* User Answer */}
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Answer</h5>
                                        <div className="p-3 rounded-lg bg-white/5 text-gray-300 text-sm whitespace-pre-wrap font-mono">
                                            {item.user_answer || '(No answer provided)'}
                                        </div>
                                    </div>

                                    {/* AI Feedback */}
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-bold text-cyan-500/80 uppercase tracking-wider">AI Feedback</h5>
                                        <div className="p-3 rounded-lg bg-cyan-950/10 border border-cyan-500/10 text-cyan-100/90 text-sm whitespace-pre-wrap">
                                            {item.feedback || 'No detailed feedback available.'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
