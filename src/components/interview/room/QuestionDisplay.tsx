'use client';

import React from 'react';
import { InterviewQuestion, QuestionType } from '@/modules/interview/types';
import { Mic } from 'lucide-react';

interface QuestionDisplayProps {
    question: InterviewQuestion;
    answer: any;
    onAnswerChange: (val: any) => void;
}

export default function QuestionDisplay({ question, answer, onAnswerChange }: QuestionDisplayProps) {
    const renderMCQ = () => {
        return (
            <div className="space-y-3 mt-6">
                {question.options?.map((opt, idx) => {
                    const isSelected = answer === opt; // Assuming answer stores the option value string
                    return (
                        <div
                            key={idx}
                            onClick={() => onAnswerChange(opt)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${isSelected
                                ? 'bg-cyan-500/10 border-cyan-500'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected
                                ? 'border-cyan-500'
                                : 'border-gray-500'
                                }`}>
                                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />}
                            </div>
                            <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                {opt}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderEssay = () => {
        return (
            <div className="mt-6">
                <textarea
                    value={answer || ''}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 resize-y"
                />
                <div className="mt-2 text-right text-xs text-gray-500">
                    {answer ? answer.length : 0} characters
                </div>
            </div>
        );
    };

    const renderVoice = () => {
        return (
            <div className="mt-6 flex flex-col items-center justify-center bg-white/5 border border-dashed border-white/10 rounded-xl p-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                    <Mic size={32} />
                </div>
                <p className="text-gray-400">Voice recording is coming soon.</p>
                {/* Placeholder for Voice Recorder implementation later */}
                {/* For now, maybe just a text area fallback ?? Or purely informative */}
                <textarea
                    value={answer || ''}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    placeholder="Transcript fallback..."
                    className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-gray-500"
                />
            </div>
        );
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-6">
            <div className="space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/50 text-cyan-400 border border-cyan-900/50">
                    {question.type}
                </span>
                <h2 className="text-2xl font-semibold text-white leading-relaxed">
                    {question.question_text}
                </h2>
            </div>

            {question.type === 'MCQ' && renderMCQ()}
            {question.type === 'ESSAY' && renderEssay()}
            {question.type === 'VOICE' && renderVoice()}
        </div>
    );
}
