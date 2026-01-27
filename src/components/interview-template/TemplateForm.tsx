'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateTemplateRequest, TemplateScoringStrategy, InterviewTemplate } from '@/modules/interview-template/types';
import { Loader2 } from 'lucide-react';
import { SCORING_STRATEGIES } from '@/modules/interview-template/constants';
import { QUESTION_LEVELS, QUESTION_STACKS } from '@/modules/question-bank/constants';

const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().optional(),
    stack: z.string().min(1, 'Stack is required'),
    level: z.string().min(1, 'Level is required'),
    duration_minutes: z.coerce.number().min(1, 'Duration must be at least 1 minute'),
    scoring_strategy: z.nativeEnum(TemplateScoringStrategy),
});

type TemplateFormValues = z.infer<typeof schema>;

interface TemplateFormProps {
    initialData?: InterviewTemplate;
    onSubmit: (data: CreateTemplateRequest) => void;
    loading?: boolean;
}

export default function TemplateForm({ initialData, onSubmit, loading }: TemplateFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            stack: '',
            level: '',
            duration_minutes: 60,
            scoring_strategy: TemplateScoringStrategy.WEIGHTED
        },
    });

    useEffect(() => {
        if (initialData) {
            setValue('name', initialData.name);
            setValue('description', initialData.description || '');
            setValue('stack', initialData.stack);
            setValue('level', initialData.level);
            setValue('duration_minutes', initialData.duration_minutes);
            setValue('scoring_strategy', initialData.scoring_strategy);
        }
    }, [initialData, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-[#050505]/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300">Template Name</label>
                    <input
                        {...register('name')}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-gray-600"
                        placeholder="e.g. Backend Senior - Laravel"
                    />
                    {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        {...register('description')}
                        rows={3}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-gray-600"
                        placeholder="Brief description of the template purpose"
                    />
                    {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Stack</label>
                    <select
                        {...register('stack')}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all appearance-none"
                    >
                        <option value="" className="bg-[#1a1a1a]">Select Stack</option>
                        {QUESTION_STACKS.map(stack => (
                            <option key={stack.value} value={stack.value} className="bg-[#1a1a1a]">{stack.label}</option>
                        ))}
                    </select>
                    {errors.stack && <p className="text-red-400 text-xs">{errors.stack.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Level</label>
                    <select
                        {...register('level')}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all appearance-none"
                    >
                        <option value="" className="bg-[#1a1a1a]">Select Level</option>
                        {QUESTION_LEVELS.map(level => (
                            <option key={level.value} value={level.value} className="bg-[#1a1a1a]">{level.label}</option>
                        ))}
                    </select>
                    {errors.level && <p className="text-red-400 text-xs">{errors.level.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Duration (Minutes)</label>
                    <input
                        type="number"
                        {...register('duration_minutes')}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-gray-600"
                    />
                    {errors.duration_minutes && <p className="text-red-400 text-xs">{errors.duration_minutes.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Scoring Strategy</label>
                    <select
                        {...register('scoring_strategy')}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all appearance-none"
                    >
                        {SCORING_STRATEGIES.map(st => (
                            <option key={st.value} value={st.value} className="bg-[#1a1a1a]">{st.label}</option>
                        ))}
                    </select>
                    {errors.scoring_strategy && <p className="text-red-400 text-xs">{errors.scoring_strategy.message}</p>}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading && <Loader2 className="animate-spin" size={18} />}
                    {initialData ? 'Update Template' : 'Create Template'}
                </button>
            </div>
        </form>
    );
}
