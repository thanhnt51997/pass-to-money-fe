'use client';

import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    percentage?: number;
}

/**
 * ProgressBar Component
 * Shows interview completion progress
 */
export function ProgressBar({ current, total, percentage }: ProgressBarProps) {
    const progress = percentage ?? (total > 0 ? (current / total) * 100 : 0);

    return (
        <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="font-medium text-white">
                    {current} / {total} questions
                </span>
            </div>

            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
            </div>

            <div className="text-right text-xs text-gray-500">
                {Math.round(progress)}% complete
            </div>
        </div>
    );
}
