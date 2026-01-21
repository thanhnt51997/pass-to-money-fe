'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Send, Loader2 } from 'lucide-react';

interface NavigationButtonsProps {
    canGoPrevious: boolean;
    canGoNext: boolean;
    isLastQuestion: boolean;
    canSubmit: boolean;
    isSubmitting: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

/**
 * NavigationButtons Component
 * Previous/Next/Submit controls for interview
 */
export function NavigationButtons({
    canGoPrevious,
    canGoNext,
    isLastQuestion,
    canSubmit,
    isSubmitting,
    onPrevious,
    onNext,
    onSubmit,
}: NavigationButtonsProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            {/* Previous Button */}
            <button
                onClick={onPrevious}
                disabled={!canGoPrevious}
                className={`
          flex items-center gap-2 rounded-2xl px-6 py-3 font-medium transition-all
          ${canGoPrevious
                        ? 'bg-white/10 text-white hover:bg-white/20 active:scale-95'
                        : 'cursor-not-allowed bg-white/5 text-gray-600'
                    }
        `}
            >
                <ChevronLeft className="h-5 w-5" />
                Previous
            </button>

            {/* Next or Submit Button */}
            {!isLastQuestion ? (
                <button
                    onClick={onNext}
                    disabled={!canGoNext}
                    className={`
            flex items-center gap-2 rounded-2xl px-6 py-3 font-medium transition-all
            ${canGoNext
                            ? 'bg-cyan-500 text-black hover:bg-cyan-400 active:scale-95'
                            : 'cursor-not-allowed bg-white/5 text-gray-600'
                        }
          `}
                >
                    Next
                    <ChevronRight className="h-5 w-5" />
                </button>
            ) : (
                <button
                    onClick={onSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className={`
            relative flex items-center gap-2 overflow-hidden rounded-2xl px-8 py-3 font-bold transition-all
            ${canSubmit && !isSubmitting
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 active:scale-95'
                            : 'cursor-not-allowed bg-white/5 text-gray-600'
                        }
          `}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="h-5 w-5" />
                            Submit Interview
                        </>
                    )}

                    {canSubmit && !isSubmitting && (
                        <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    )}
                </button>
            )}
        </div>
    );
}
