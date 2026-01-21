'use client';

import React, { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';

interface EssayInputProps {
    value: string;
    onChange: (value: string) => void;
    onSave?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
}

/**
 * EssayInput Component
 * Text area with auto-save and character count
 */
export function EssayInput({
    value,
    onChange,
    onSave,
    placeholder = 'Type your answer here...',
    disabled = false,
    minLength,
    maxLength = 5000,
}: EssayInputProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Auto-save with debounce
    useEffect(() => {
        if (!onSave || !value) return;

        const timer = setTimeout(async () => {
            setIsSaving(true);
            try {
                await onSave(value);
                setLastSaved(new Date());
            } finally {
                setIsSaving(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [value, onSave]);

    const charCount = value.length;
    const isOverLimit = maxLength && charCount > maxLength;
    const isUnderMin = minLength && charCount < minLength;

    return (
        <div className="space-y-3">
            <div className="relative">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={10}
                    className={`
            w-full rounded-2xl border bg-white/5 p-4 text-white placeholder:text-gray-600 
            outline-none transition-all resize-none
            ${isOverLimit
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                            : 'border-white/10 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10'
                        }
            ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          `}
                />

                {/* Auto-save Indicator */}
                {onSave && (
                    <div className="absolute right-4 top-4">
                        {isSaving ? (
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Save className="h-4 w-4 animate-pulse" />
                                <span>Saving...</span>
                            </div>
                        ) : lastSaved ? (
                            <div className="flex items-center gap-2 text-xs text-green-400">
                                <Check className="h-4 w-4" />
                                <span>Saved</span>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>

            {/* Character Count */}
            <div className="flex items-center justify-between text-xs">
                <div>
                    {minLength && (
                        <span className={isUnderMin ? 'text-yellow-400' : 'text-gray-500'}>
                            Minimum {minLength} characters
                        </span>
                    )}
                </div>
                <div className={isOverLimit ? 'text-red-400' : 'text-gray-500'}>
                    {charCount} / {maxLength}
                </div>
            </div>
        </div>
    );
}
