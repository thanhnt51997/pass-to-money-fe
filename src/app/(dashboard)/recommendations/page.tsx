'use client';

import React from 'react';
import { Brain, RefreshCw, AlertCircle, Sparkles, Target, BookOpen, ChevronRight } from 'lucide-react';
import { useAIRecommendation } from '@/modules/ai-recommendation/hooks';
import type { AIReadiness } from '@/modules/ai-recommendation/types';

const LEVEL_CONFIG: Record<AIReadiness['level'], { label: string; color: string; bg: string }> = {
    NOT_READY: { label: 'Not Ready', color: 'text-red-400', bg: 'bg-red-500/10 ring-red-500/20' },
    PARTIALLY_READY: { label: 'Partially Ready', color: 'text-yellow-400', bg: 'bg-yellow-500/10 ring-yellow-500/20' },
    READY: { label: 'Ready', color: 'text-cyan-400', bg: 'bg-cyan-500/10 ring-cyan-500/20' },
    HIGHLY_READY: { label: 'Highly Ready', color: 'text-emerald-400', bg: 'bg-emerald-500/10 ring-emerald-500/20' },
};

const DIFFICULTY_COLOR: Record<string, string> = {
    easy: 'text-emerald-400 bg-emerald-500/10',
    medium: 'text-yellow-400 bg-yellow-500/10',
    hard: 'text-red-400 bg-red-500/10',
};

/**
 * UC-AI-01: View AI Recommendation Dashboard
 */
export default function RecommendationsPage() {
    const {
        summary,
        roadmap,
        skillGaps,
        readiness,
        questions,
        isLoading,
        hasNoData,
        isRegenerating,
        regenerateMessage,
        regenerate,
    } = useAIRecommendation();

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center space-y-4">
                    <Brain size={48} className="mx-auto text-cyan-400 animate-pulse" />
                    <p className="text-gray-400">Loading AI recommendations...</p>
                </div>
            </div>
        );
    }

    if (hasNoData) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center space-y-6 max-w-md">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 mx-auto">
                        <Sparkles size={40} className="text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">No AI Recommendations Yet</h2>
                        <p className="mt-2 text-gray-400">
                            Complete at least one interview to generate your personalized AI recommendations.
                        </p>
                    </div>
                    <button
                        onClick={regenerate}
                        disabled={isRegenerating}
                        className="flex items-center gap-2 mx-auto rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition-all hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={18} className={isRegenerating ? 'animate-spin' : ''} />
                        {isRegenerating ? 'Generating...' : 'Generate Recommendations'}
                    </button>
                </div>
            </div>
        );
    }

    const levelConfig = readiness ? LEVEL_CONFIG[readiness.level] : null;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Brain size={28} className="text-cyan-400" />
                    <h1 className="text-2xl font-bold text-white">AI Recommendations</h1>
                </div>
                <div className="flex items-center gap-3">
                    {regenerateMessage && (
                        <span className="text-sm text-cyan-400">{regenerateMessage}</span>
                    )}
                    <button
                        onClick={regenerate}
                        disabled={isRegenerating}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={16} className={isRegenerating ? 'animate-spin' : ''} />
                        {isRegenerating ? 'Processing...' : 'Regenerate'}
                    </button>
                </div>
            </div>

            {/* Readiness Score Card */}
            {readiness && levelConfig && (
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 p-8">
                    <div className="flex items-center gap-8">
                        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white/5 ring-4 ring-cyan-500/20">
                            <span className="text-4xl font-black text-white">{readiness.score}%</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">AI Readiness Score</p>
                            <h2 className="mt-1 text-3xl font-bold text-white">
                                {summary?.readinessLevel ?? levelConfig.label}
                            </h2>
                            <span className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${levelConfig.bg} ${levelConfig.color}`}>
                                {levelConfig.label}
                            </span>
                        </div>
                        {summary && (
                            <div className="ml-auto hidden lg:block space-y-2">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Strengths</p>
                                <ul className="space-y-1">
                                    {summary.strengths.slice(0, 3).map((s, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Breakdown bars */}
                    {Object.keys(readiness.breakdowns).length > 0 && (
                        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {Object.entries(readiness.breakdowns).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}</span>
                                        <span className="font-bold text-white">{value}%</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-white/5">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                                            style={{ width: `${value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Skill Gaps */}
                {skillGaps.length > 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="mb-6 flex items-center gap-2">
                            <Target size={20} className="text-cyan-400" />
                            <h3 className="text-lg font-bold text-white">Skill Gaps</h3>
                        </div>
                        <div className="space-y-6">
                            {skillGaps.map((gap, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-white">{gap.dimension}</span>
                                        <span className="text-gray-400">
                                            {gap.currentScore} → {gap.targetScore}
                                            <span className="ml-1 text-red-400">(gap: {gap.gap})</span>
                                        </span>
                                    </div>
                                    <div className="relative h-2 rounded-full bg-white/5">
                                        {/* Target indicator */}
                                        <div
                                            className="absolute top-0 h-full w-0.5 bg-white/30 rounded-full"
                                            style={{ left: `${gap.targetScore}%` }}
                                        />
                                        {/* Current score */}
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                                            style={{ width: `${gap.currentScore}%` }}
                                        />
                                    </div>
                                    {gap.recommendations.length > 0 && (
                                        <p className="text-xs text-gray-500">{gap.recommendations[0]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Areas for Improvement */}
                {summary && summary.areasForImprovement.length > 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="mb-6 flex items-center gap-2">
                            <AlertCircle size={20} className="text-yellow-400" />
                            <h3 className="text-lg font-bold text-white">Areas for Improvement</h3>
                        </div>
                        <ul className="space-y-3">
                            {summary.areasForImprovement.map((area, i) => (
                                <li key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-xs font-bold text-yellow-400 ring-1 ring-yellow-500/20">
                                        {i + 1}
                                    </span>
                                    <span className="text-sm text-gray-300">{area}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Learning Roadmap */}
            {roadmap.length > 0 && (
                <div>
                    <div className="mb-6 flex items-center gap-2">
                        <ChevronRight size={20} className="text-cyan-400" />
                        <h3 className="text-xl font-bold text-white">Learning Roadmap</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {roadmap.map((phase) => (
                            <div
                                key={phase.phase}
                                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-xs font-bold text-cyan-400 ring-1 ring-cyan-500/20">
                                        {phase.phase}
                                    </span>
                                    <span className="text-xs text-gray-500">{phase.estimatedDurationWeeks}w</span>
                                </div>
                                <h4 className="font-bold text-white">{phase.title}</h4>
                                <p className="mt-1 text-sm text-gray-400">{phase.description}</p>
                                {phase.skills.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {phase.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-400 ring-1 ring-white/10"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommended Questions */}
            {questions.length > 0 && (
                <div>
                    <div className="mb-6 flex items-center gap-2">
                        <BookOpen size={20} className="text-cyan-400" />
                        <h3 className="text-xl font-bold text-white">Recommended Practice Questions</h3>
                    </div>
                    <div className="space-y-3">
                        {questions.map((q) => (
                            <div
                                key={q.id}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <p className="text-sm font-medium text-white">{q.content}</p>
                                    <div className="flex shrink-0 items-center gap-2">
                                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-400 ring-1 ring-white/10">
                                            {q.type}
                                        </span>
                                        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${DIFFICULTY_COLOR[q.difficulty.toLowerCase()] ?? 'text-gray-400 bg-white/5'}`}>
                                            {q.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-gray-500 italic">{q.rationale}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
