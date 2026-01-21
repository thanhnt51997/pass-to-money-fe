'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { QuestionType } from '@/modules/interview/types';
import { MCQOptions } from './MCQOptions';
import { EssayInput } from './EssayInput';
import { VoiceRecorder } from './VoiceRecorder';

interface QuestionCardProps {
    questionNumber: number;
    totalQuestions: number;
    questionText: string;
    questionType: QuestionType;
    isRequired: boolean;
    options?: string[];
    value?: string;
    onChange: (value: string) => void;
    onSave?: (value: string) => void;
}

/**
 * QuestionCard Component
 * Displays question with appropriate input based on type
 */
export function QuestionCard({
    questionNumber,
    totalQuestions,
    questionText,
    questionType,
    isRequired,
    options,
    value = '',
    onChange,
    onSave,
}: QuestionCardProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl">
            {/* Question Header */}
            <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-cyan-400">
                        Question {questionNumber} of {totalQuestions}
                    </span>
                    {isRequired && (
                        <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                            <AlertCircle className="h-3 w-3" />
                            Required
                        </span>
                    )}
                </div>

                <h2 className="text-xl font-semibold text-white leading-relaxed">
                    {questionText}
                </h2>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="rounded-full bg-white/5 px-2 py-1">
                        {questionType}
                    </span>
                </div>
            </div>

            {/* Question Input */}
            <div className="mt-6">
                {questionType === 'MCQ' && options && (
                    <MCQOptions
                        options={options}
                        selectedOption={value}
                        onSelect={onChange}
                    />
                )}

                {questionType === 'ESSAY' && (
                    <EssayInput
                        value={value}
                        onChange={onChange}
                        onSave={onSave}
                        placeholder="Write your detailed answer here..."
                        maxLength={5000}
                    />
                )}

                {questionType === 'VOICE' && (
                    <VoiceRecorder
                        onRecordingComplete={onChange}
                    />
                )}
            </div>
        </div>
    );
}
