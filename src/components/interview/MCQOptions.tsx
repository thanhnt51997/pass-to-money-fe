'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface MCQOptionsProps {
    options: string[];
    selectedOption?: string;
    onSelect: (option: string) => void;
    disabled?: boolean;
}

/**
 * MCQOptions Component
 * Radio button group for multiple choice questions
 */
export function MCQOptions({ options, selectedOption, onSelect, disabled }: MCQOptionsProps) {
    return (
        <div className="space-y-3">
            {options.map((option, index) => {
                const isSelected = selectedOption === option;
                const optionLabel = String.fromCharCode(65 + index); // A, B, C, D...

                return (
                    <button
                        key={option}
                        onClick={() => !disabled && onSelect(option)}
                        disabled={disabled}
                        className={`
              group relative w-full rounded-2xl border p-4 text-left transition-all
              ${isSelected
                                ? 'border-cyan-500 bg-cyan-500/10'
                                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                            }
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
                    >
                        <div className="flex items-start gap-4">
                            {/* Option Letter */}
                            <div
                                className={`
                  flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-bold transition-colors
                  ${isSelected
                                        ? 'bg-cyan-500 text-black'
                                        : 'bg-white/10 text-gray-400 group-hover:bg-white/20'
                                    }
                `}
                            >
                                {optionLabel}
                            </div>

                            {/* Option Text */}
                            <div className="flex-1 pt-1">
                                <p className={`text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                    {option}
                                </p>
                            </div>

                            {/* Selected Indicator */}
                            {isSelected && (
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-cyan-400" />
                            )}
                        </div>

                        {/* Hover Effect */}
                        {!disabled && (
                            <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
