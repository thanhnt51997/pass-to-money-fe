'use client';

import React from 'react';
import { InterviewTemplate } from '@/modules/interview-template/types';
import { Clock, Layers, Zap, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TemplateSelectionCardProps {
    template: InterviewTemplate;
    onStart: (templateId: string) => void;
    loading?: boolean;
}

export default function TemplateSelectionCard({ template, onStart, loading }: TemplateSelectionCardProps) {
    return (
        <div className="group relative bg-[#09090b] border border-white/5 rounded-xl p-5 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] transition-all duration-300">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

            <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950/50 text-cyan-400 border border-cyan-900/50 uppercase tracking-wider">
                                {template.level}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950/50 text-purple-400 border border-purple-900/50 uppercase tracking-wider">
                                {template.stack}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {template.name}
                        </h3>
                    </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 min-h-[40px]">
                    {template.description || 'No description provided.'}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-lg">
                        <Clock size={14} className="text-cyan-500" />
                        <span>{template.duration_minutes} min</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-lg">
                        <Layers size={14} className="text-purple-500" />
                        <span>{template.questions?.length || 0} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 p-2 rounded-lg col-span-2">
                        <Zap size={14} className="text-yellow-500" />
                        <span className="capitalize">{template.scoring_strategy.replace('_', ' ')} Scoring</span>
                    </div>
                </div>

                <button
                    onClick={() => onStart(template.id)}
                    disabled={loading}
                    className="w-full mt-4 bg-white/5 hover:bg-cyan-600 text-cyan-400 hover:text-white border border-white/10 hover:border-cyan-500 font-medium py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        'Start Interview'
                    )}
                </button>
            </div>
        </div>
    );
}

