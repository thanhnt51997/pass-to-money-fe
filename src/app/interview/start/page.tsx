'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Zap } from 'lucide-react';
import { useStartInterview } from '@/modules/interview/hooks';
import { Level, Stack } from '@/modules/interview/types';
import { LEVELS, STACKS, LEVEL_LABELS, STACK_LABELS } from '@/modules/interview/constants';

/**
 * Start Interview Page
 * Select level and stack to begin interview
 */
export default function StartInterviewPage() {
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
    const [selectedStack, setSelectedStack] = useState<Stack | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { startInterview } = useStartInterview();
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = async () => {
        if (!selectedLevel || !selectedStack) return;

        setIsLoading(true);
        setError(null);

        try {
            await startInterview(selectedLevel, selectedStack);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to start interview. Please try again.');
            setIsLoading(false);
        }
    };

    const canStart = selectedLevel && selectedStack && !isLoading;

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] font-sans selection:bg-cyan-500/30" suppressHydrationWarning>
            {/* Dynamic Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-cyan-600/20 blur-[120px]" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

            <main className="relative z-10 w-full max-w-4xl px-6 my-12">
                <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20">

                    {/* Header */}
                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm font-medium">Interview Practice</span>
                        </div>
                        <h1 className="mb-3 text-4xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
                            Start Your Interview
                        </h1>
                        <p className="text-gray-400">Select your target level and tech stack to begin</p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="space-y-8">
                        {/* Level Selection */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-300">
                                Select Level <span className="text-red-400">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {Object.values(LEVELS).map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedLevel(level as Level)}
                                        className={`
                      group/card relative overflow-hidden rounded-2xl border p-6 text-center transition-all
                      ${selectedLevel === level
                                                ? 'border-cyan-500 bg-cyan-500/10'
                                                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                            }
                    `}
                                    >
                                        <div className="relative z-10">
                                            <div className="mb-2 text-2xl">
                                                {level === 'JUNIOR' && '🌱'}
                                                {level === 'MIDDLE' && '🌿'}
                                                {level === 'SENIOR' && '🌳'}
                                                {level === 'LEAD' && '🏆'}
                                            </div>
                                            <div className={`font-medium ${selectedLevel === level ? 'text-white' : 'text-gray-300'}`}>
                                                {LEVEL_LABELS[level]}
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 transition-opacity group-hover/card:opacity-100" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stack Selection */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-300">
                                Select Tech Stack <span className="text-red-400">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                {Object.values(STACKS).map((stack) => (
                                    <button
                                        key={stack}
                                        onClick={() => setSelectedStack(stack as Stack)}
                                        className={`
                      group/card relative overflow-hidden rounded-2xl border p-6 text-center transition-all
                      ${selectedStack === stack
                                                ? 'border-purple-500 bg-purple-500/10'
                                                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                            }
                    `}
                                    >
                                        <div className="relative z-10">
                                            <div className="mb-2 text-2xl">
                                                {stack === 'FRONTEND' && '🎨'}
                                                {stack === 'BACKEND' && '⚙️'}
                                                {stack === 'FULLSTACK' && '🚀'}
                                                {stack === 'DEVOPS' && '☁️'}
                                                {stack === 'MOBILE' && '📱'}
                                            </div>
                                            <div className={`font-medium ${selectedStack === stack ? 'text-white' : 'text-gray-300'}`}>
                                                {STACK_LABELS[stack]}
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 transition-opacity group-hover/card:opacity-100" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Start Button */}
                        <button
                            onClick={handleStart}
                            disabled={!canStart}
                            className={`
                relative w-full overflow-hidden rounded-2xl py-4 font-bold transition-all
                ${canStart
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 active:scale-[0.98]'
                                    : 'cursor-not-allowed bg-white/5 text-gray-600'
                                }
              `}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Starting Interview...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="h-5 w-5" />
                                        Start Interview
                                    </>
                                )}
                            </span>
                            {canStart && !isLoading && (
                                <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                            )}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
