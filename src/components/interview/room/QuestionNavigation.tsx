'use client';

import React from 'react';
import { InterviewQuestion, InterviewStatus } from '@/modules/interview/types';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility exists, otherwise I'll use standard clsx or template string. I'll stick to template string for safety if unsure, or define a small helper if needed. I'll rely on tailwind template literal.

interface QuestionNavigationProps {
    questions: InterviewQuestion[];
    currentIndex: number;
    onSelect: (index: number) => void;
    // We ideally need to know which questions are answered.
    // For now, let's assume we can pass an array of answered IDs or check store if we were connected.
    // But to keep it dumb, let's pass an `answers` map or similar.
    // Simplifying: accepting `answeredIndices` set.
    answeredIndices: Set<number>;
}

export default function QuestionNavigation({ questions, currentIndex, onSelect, answeredIndices }: QuestionNavigationProps) {
    return (
        <div className="w-80 border-r border-white/10 bg-[#09090b] flex flex-col hidden lg:flex h-[calc(100vh-64px)] overflow-hidden">
            <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Trophy className="text-cyan-500" size={20} />
                    Questions
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                    {answeredIndices.size} of {questions.length} completed
                </p>
                {/* Progress Bar */}
                <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cyan-500 transition-all duration-300"
                        style={{ width: `${(answeredIndices.size / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {questions.map((q, idx) => {
                    const isActive = idx === currentIndex;
                    const isAnswered = answeredIndices.has(idx);

                    return (
                        <button
                            key={q.id}
                            onClick={() => onSelect(idx)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all border ${isActive
                                ? 'bg-cyan-500/10 border-cyan-500/50'
                                : 'bg-transparent border-transparent hover:bg-white/5'
                                }`}
                        >
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border ${isActive
                                ? 'bg-cyan-500 text-white border-cyan-500'
                                : isAnswered
                                    ? 'bg-green-500/20 text-green-400 border-green-500/50'
                                    : 'bg-white/5 text-gray-400 border-white/10'
                                }`}>
                                {idx + 1}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <p className={`text-sm truncate ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>
                                    {q.question_text.replace(/<[^>]*>/g, '') || 'Untitled Question'}
                                </p>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 uppercase">
                                        {q.type}
                                    </span>
                                </div>
                            </div>
                            {isAnswered && (
                                <CheckCircle2 size={16} className="text-green-500" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
